/** @flow */

import * as Immutable from 'immutable'

import type { Action } from '../actions/article'
import type { Article, ArticleError } from '../services/articles'

type ArticleId = number
type PageNumber = number

export type State = {
  loading: boolean,
  lastError: ?Error,
  drafts: Immutable.Map<ArticleId, Article>,
  currentDraft: {
    draft: ?Article,
    errors: Array<ArticleError>,
  },
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
  drafts: new Immutable.Map(),
  currentDraft: {
    draft: null,
    errors: [],
  },
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

        articlesById: action.articles.reduce((acc, x) => acc.set(x.id, {...x, comments: []}), state.articlesById),
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

    case '@ARTICLES/LOAD_DRAFTS':
      return {
        ...state,
        drafts: action.drafts.reduce((acc, x) => acc.set(x.id, x), new Immutable.Map()),
      }

    case '@ARTICLES/DRAFT':
      return {
        ...state,
        loading: false,
        lastError: null,

        drafts: action.draft ? state.drafts.set(action.draft.id, action.draft) : state.drafts,
        currentDraft: {
          draft: action.draft,
          errors: action.errors,
        },
      }

    default:
      return state
  }
}
