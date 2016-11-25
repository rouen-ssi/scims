/** @flow */

import { ArticleService } from '../services/articles'
import type { Article } from '../services/articles'
import type { State } from '../reducers'

export type Thunk<State, Action> = (dispatch: (state: Action) => void, getState: () => State) => any;

export type Action
  = { type: '@ARTICLES/LOAD', articles: Array<Article>, pagination: { current: number, count: number } }
  | { type: '@ARTICLES/LOAD_ONE', article: Article }
  | { type: '@ARTICLES/PAGINATE', page: number }
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

export function loading(): Action {
  return { type: '@ARTICLES/LOADING' }
}

export function loadError(error: Error): Action {
  return { type: '@ARTICLES/LOAD_ERROR', error }
}

export function fetchOne(articleId: number): Thunk<State, Action> {
  const articles = new ArticleService('http://127.0.0.1:3000')

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
  const articles = new ArticleService('http://127.0.0.1:3000')

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
