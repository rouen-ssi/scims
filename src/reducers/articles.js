/** @flow */

import * as Immutable from 'immutable'

import type { Action } from '../actions/article'
import type { Article } from '../services/articles'

type PageNumber = number

export type State = {
  loading: boolean,
  lastError: ?Error,
  articles: Immutable.Map<PageNumber, Array<Article>>,
  pagination: {
    current: number,
    count: number,
  },
}

const initialState: State = {
  loading: false,
  lastError: null,
  articles: new Immutable.Map(),
  pagination: {
    current: 1,
    count: 1,
  },
}

export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case '@ARTICLES/LOADING':
      return {
        ...state,
        loading: true,
      }

    case '@ARTICLES/LOAD_ERROR':
      return {
        ...state,
        loading: false,
        lastError: action.error,
      }

    case '@ARTICLES/LOAD':
      return {
        ...state,
        loading: false,
        lastError: null,

        articles: state.articles.set(action.pagination.current, action.articles),
        pagination: action.pagination,
      }

    case '@ARTICLES/PAGINATE':
      return {
        ...state,
        pagination: {
          ...state.pagination,
          current: action.page,
        },
      }

    default:
      return state
  }
}
