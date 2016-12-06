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
    draft: Article,
    errors: Array<ArticleError>,
  },
  articlesById: Immutable.Map<ArticleId, Article>,
  articlesByPage: Immutable.Map<PageNumber, Array<Article>>,
  pagination: {
    categoryId: ?number,
    current: number,
    count: number,
  },
}

const initialState: State = {
  loading: false,
  lastError: null,
  drafts: new Immutable.Map(),
  currentDraft: {
    draft: emptyArticle(),
    errors: [],
  },
  articlesById: new Immutable.Map(),
  articlesByPage: new Immutable.Map(),
  pagination: {
    categoryId: null,
    current: 0,
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
          categoryId: action.categoryId,
        },
      }

    case '@ARTICLES/LOAD_DRAFTS':
      return {
        ...state,
        loading: false,
        loadError: null,
        drafts: action.drafts.reduce((acc, x) => acc.set(x.id, x), new Immutable.Map()),
      }

    case '@ARTICLES/DRAFT':
      return {
        ...state,
        loading: false,
        lastError: null,

        articlesById: (
          action.draft && !action.draft.is_draft
          ? state.articlesById.set(action.draft.id, action.draft)
          : state.articlesById
        ),

        drafts: (
          action.draft
          ? action.draft.is_draft
            ? state.drafts.set(action.draft.id, action.draft)
            : state.drafts.remove(action.draft.id)
          : state.drafts
        ),
        currentDraft: {
          draft: action.draft,
          errors: action.errors,
        },
      }

    case '@ARTICLES/UNLOAD_DRAFT':
      return {
        ...state,

        currentDraft: initialState.currentDraft,
      }

    default:
      return state
  }
}

function emptyArticle() {
  return {
    id: 0,
    is_draft: true,
    user: {
      uid: '',
      email: '',
      first_name: '',
      last_name: '',
    },
    title: '',
    content: '',
    category_id: 0,
    subcategory_id: 0,
    publication_date: '',
    last_modification_date: '',
    comments_count: 0,
  }
}
