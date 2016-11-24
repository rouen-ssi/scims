/** @flow */

import { Map as ImmutableMap } from 'immutable'

import type { Category } from '../services/categories'
import type { Article } from '../services/articles'
import type { Action } from '../actions/category'

type CategoryId = number

export type State = {
  categories: ImmutableMap<CategoryId, Category>,
  articles: ImmutableMap<CategoryId, Array<Article>>,
  fetching: boolean,
  lastError: ?Error,
}

const initialState: State = {
  categories: new ImmutableMap(),
  articles: new ImmutableMap(),
  fetching: false,
  lastError: null,
}

function groupBy<T, K>(xs: Array<T>, fun: (_: T) => K): ImmutableMap<K, Array<T>> {
  let result: ImmutableMap<K, Array<T>> = new ImmutableMap()

  for (const x of xs) {
    const k = fun(x)
    if (result.has(k)) {
      result = result.set(k, result.get(k).concat(x))
    } else {
      result = result.set(k, [x])
    }
  }

  return result
}

export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case '@CATEGORY/RECEIVE':
      return {
        ...state,
        categories: state.categories.set(action.category.id, action.category),
        articles: state.articles.merge(groupBy(action.articles, x => x.category_id)),
        fetching: false,
        lastError: null,
      }

    case '@CATEGORY/RECEIVE_ALL':
      return {
        ...state,
        categories: groupBy(action.categories, x => x.id).map(x => x[0]),
        fetching: false,
        lastError: null,
      }

    case '@CATEGORY/FETCHING':
      return {
        ...state,
        fetching: true,
        lastError: null,
      }

    case '@CATEGORY/FETCH_ERROR':
      return {
        ...state,
        fetching: false,
        lastError: action.error,
      }

    default:
      return state
  }
}
