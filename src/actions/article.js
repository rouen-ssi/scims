/** @flow */

import { ArticleService } from '../services/articles'
import type { Article, ArticleError } from '../services/articles'
import type { State } from '../reducers'

export type Pagination = {
  categoryId: ?number,
  current: number,
  count: number,
}

export type Action
  = { type: '@ARTICLES/LOAD', articles: Array<Article>, pagination: Pagination }
  | { type: '@ARTICLES/LOAD_ONE', article: Article }
  | { type: '@ARTICLES/PAGINATE', page: number, categoryId: ?number }
  | { type: '@ARTICLES/LOAD_DRAFTS', drafts: Array<Article> }
  | { type: '@ARTICLES/DRAFT', draft: Article, errors: Array<ArticleError> }
  | { type: '@ARTICLES/UNLOAD_DRAFT' }
  | { type: '@ARTICLES/LOADING' }
  | { type: '@ARTICLES/LOAD_ERROR', error: Error }
  | { type: '@ARTICLES/DELETE', articleId: number }

export function load(articles: Array<Article>, pagination: Pagination): Action {
  return { type: '@ARTICLES/LOAD', articles, pagination }
}

export function loadOne(article: Article): Action {
  return { type: '@ARTICLES/LOAD_ONE', article }
}

export function paginate(page: number, categoryId: ?number): Action {
  return { type: '@ARTICLES/PAGINATE', page, categoryId }
}

export function loadDrafts(drafts: Array<Article>): Action {
  return { type: '@ARTICLES/LOAD_DRAFTS', drafts }
}

export function draft(draft: Article, errors: Array<ArticleError> = []): Action {
  return { type: '@ARTICLES/DRAFT', draft, errors }
}

export function unloadDraft(): Action {
  return { type: '@ARTICLES/UNLOAD_DRAFT' }
}

export function loading(): Action {
  return { type: '@ARTICLES/LOADING' }
}

export function loadError(error: Error): Action {
  return { type: '@ARTICLES/LOAD_ERROR', error }
}

export function deleteArticle(articleId: number): Action {
  return { type: '@ARTICLES/DELETE', articleId }
}

export function fetchOne(articleId: number): Thunk<State, Action> {
  const articles = new ArticleService(API_URL)

  return async function(dispatch, getState) {
    const state = getState()

    if (state.articles.loading) {
      return
    }

    if (state.articles.articlesById.has(articleId)) {
      return
    }

    dispatch(loading())
    try {
      const resp = await articles.fetchOne(articleId)
      dispatch(loadOne(resp.article))
    } catch (err) {
      dispatch(loadError(err))
    }
  }
}

export function fetchPage(page: number, categoryId: ?number): Thunk<State, Action> {
  const articles = new ArticleService(API_URL)

  return async function(dispatch, getState) {
    const state = getState()

    // if we are navigating in the same category
    if (state.articles.pagination.categoryId === categoryId) {
      // and navigating to same page
      if (state.articles.pagination.current === page) {
        return // do nothing
      }

      // or navigating to an already cached page
      if (state.articles.articlesByPage.has(page)) {
        dispatch(paginate(page, categoryId))
        return // but do nothing
      }
    }

    dispatch(loading())
    try {
      const resp = await articles.fetch(page, categoryId)
      dispatch(load(resp.articles, {
        ...resp.pagination,
        categoryId,
      }))
    } catch (err) {
      dispatch(loadError(err))
    }
  }
}

export function fetchDrafts(): Thunk<State, Action> {
  return async function(dispatch, getState) {
    const state = getState()

    if (!state.articles.drafts.isEmpty()) {
      return
    }
    if (!state.account.token) {
      return
    }

    const articles = new ArticleService(API_URL, state.account.token)

    dispatch(loading())
    try {
      const resp = await articles.fetchDrafts()
      dispatch(loadDrafts(resp.drafts))
    } catch (err) {
      dispatch(loadError(err))
    }
  }
}

export function fetchDraft(articleId: number): Thunk<State, Action> {
  return async function(dispatch, getState) {
    const state = getState()
    const articles = new ArticleService(API_URL, state.account.token)
    const article = state.articles.drafts.get(articleId)

    if (state.articles.currentDraft.draft && state.articles.currentDraft.draft.id === articleId) {
      return
    }
    if (article) {
      dispatch(draft(article))
    } else {
      dispatch(loading())
      try {
        const resp = await articles.fetchOne(articleId)
        dispatch(draft(resp.article))
      } catch (err) {
        dispatch(loadError(err))
      }
    }
  }
}

export function updateDraft(article: Article): Thunk<State, Action> {
  return async function(dispatch, getState) {
    const state = getState()
    const currentUser = state.account.currentUser

    if (!currentUser) {
      return
    }

    const articles = new ArticleService(API_URL, state.account.token)

    const resp = await (article.id === 0
                       ? articles.create(article)
                       : articles.update(article.id, article))
    if (resp.success) {
      if (typeof resp.id === 'number') {
        dispatch(draft({
          ...article,
          id: resp.id,
          user: currentUser,
        }))
      } else {
        dispatch(draft(article))
      }
    } else {
      dispatch(draft(article, resp.errors))
    }
  }
}

export function requestArticleDeletion(articleId: number): Thunk<State, Action> {
  return async function(dispatch, getState) {
    const { account: { token } } = getState()

    if (!token) {
      return
    }

    const articles = new ArticleService(API_URL, token)

    const resp = await articles.delete(articleId)
    if (resp.success) {
      dispatch(deleteArticle(articleId))
    }
  }
}

// function emptyArticle(user: User): Article {
//   return {
//     id: 0,
//     is_draft: true,
//     user,
//     title: '',
//     content: '',
//     category_id: 0,
//     subcategory_id: 0,
//     publication_date: '',
//     last_modification_date: '',
//     comments_count: 0,
//   }
// }
