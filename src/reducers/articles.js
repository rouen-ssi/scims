/** @flow */

import * as Immutable from 'immutable'

import type { Action } from '../actions/article'
import type { Article } from '../services/articles'

type ArticleId = number
type PageNumber = number

export type State = {
  loading: boolean,
  lastError: ?Error,
  articlesById: Immutable.Map<ArticleId, Article>,
  articlesByPage: Immutable.Map<PageNumber, Array<Article>>,
  pagination: {
    current: number,
    count: number,
  },
}

const initialState: State = {
  loading: false,
  lastError: null,
  articlesById: new Immutable.Map(),
  articlesByPage: new Immutable.Map(),
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

        articlesById: action.articles.reduce((acc, x) => acc.set(x.id, x), state.articlesById),
        articlesByPage: state.articlesByPage.set(action.pagination.current, action.articles),
        pagination: action.pagination,
      }

    case '@ARTICLES/LOAD_ONE':
      return {
        ...state,
        loading: false,
        lastError: null,

        articlesById: state.articlesById.set(action.article.id, action.article),
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
