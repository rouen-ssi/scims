/** @flow */

import { ArticleService } from '../services/articles'
import type { Article, ArticleError } from '../services/articles'
import type { State } from '../reducers'

export type Action
  = { type: '@ARTICLES/LOAD', articles: Array<Article>, pagination: { current: number, count: number } }
  | { type: '@ARTICLES/LOAD_ONE', article: Article }
  | { type: '@ARTICLES/PAGINATE', page: number }
  | { type: '@ARTICLES/LOAD_DRAFTS', drafts: Array<Article> }
  | { type: '@ARTICLES/DRAFT', draft: ?Article, errors: Array<ArticleError> }
  | { type: '@ARTICLES/LOADING' }
  | { type: '@ARTICLES/LOAD_ERROR', error: Error }

export function load(articles: Array<Article>, pagination: { current: number, count: number }): Action {
  return { type: '@ARTICLES/LOAD', articles, pagination }
}

export function loadOne(article: Article): Action {
  return { type: '@ARTICLES/LOAD_ONE', article }
}

export function paginate(page: number): Action {
  return { type: '@ARTICLES/PAGINATE', page }
}

export function loadDrafts(drafts: Array<Article>): Action {
  return { type: '@ARTICLES/LOAD_DRAFTS', drafts }
}

export function draft(draft: ?Article, errors: Array<ArticleError> = []): Action {
  return { type: '@ARTICLES/DRAFT', draft, errors }
}

export function loading(): Action {
  return { type: '@ARTICLES/LOADING' }
}

export function loadError(error: Error): Action {
  return { type: '@ARTICLES/LOAD_ERROR', error }
}

export function fetchOne(articleId: number): Thunk<State, Action> {
  const articles = new ArticleService(API_URL)

  return async function(dispatch, getState) {
    const state = getState()

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

export function fetchPage(page: number): Thunk<State, Action> {
  const articles = new ArticleService(API_URL)

  return async function(dispatch, getState) {
    const state = getState()

    if (state.articles.articlesByPage.has(page)) {
      dispatch(paginate(page))
      return
    }

    dispatch(loading())
    try {
      const resp = await articles.fetch(page)
      dispatch(load(resp.articles, resp.pagination))
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

export function createDraft(): Thunk<State, Action> {
  return async function(dispatch, getState) {
    const state = getState()
    const articles = new ArticleService(API_URL, state.account.token)

    dispatch(loading())
    try {
      const resp1 = await articles.create({})
      if (resp1.success) {
        const resp2 = await articles.fetchOne(resp1.id)
        const article = resp2.article
        if (article.is_draft) {
          dispatch(draft(article))
        } else {
          throw new Error('the newly created draft has already been published')
        }
      } else {
        dispatch(draft(null, resp1.errors))
      }
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
    const articles = new ArticleService(API_URL, state.account.token)

    const resp = await articles.update(article.id, article)
    if (resp.success) {
      dispatch(draft(article))
    } else {
      dispatch(draft(article, resp.errors))
    }
  }
}
