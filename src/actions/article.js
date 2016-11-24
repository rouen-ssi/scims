/** @flow */

import { ArticleService } from '../services/articles'
import type { Article } from '../services/articles'

export type Action
  = { type: '@ARTICLE/LOADING' }
  | { type: '@ARTICLE/LOAD_ERROR', error: Error }
  | { type: '@ARTICLE/PUSH_ARTICLE', article: Article }
  | { type: '@ARTICLE/XPUSH_ARTICLE', articles: Array<Article>, categoryId?: number, page?: number, pageCount?: number }
  | { type: '@ARTICLE/NEXT_PAGE' }
  | { type: '@ARTICLE/PREVIOUS_PAGE' }

export function loading(): Action {
  return { type: '@ARTICLE/LOADING' }
}

export function loadError(error: Error): Action {
  return { type: '@ARTICLE/LOAD_ERROR', error }
}

export function pushArticles(articles: Array<Article>, categoryId?: number, page?: number, pageCount?: number): Action {
  return { type: '@ARTICLE/XPUSH_ARTICLE', articles, categoryId, page, pageCount }
}

export function nextPage(): Action {
  return { type: '@ARTICLE/NEXT_PAGE' }
}

export function previousPage(): Action {
  return { type: '@ARTICLE/PREVIOUS_PAGE' }
}

export function fetchArticles(categoryId?: number, page?: number): Function {
  const articles = new ArticleService('http://127.0.0.1:3000')

  return async function(dispatch: (action: Action) => void) {
    dispatch(loading())
    try {
      const result = await articles.fetch(page, categoryId)
      dispatch(pushArticles(result.articles, categoryId, page, result.pagination.count))
    } catch (err) {
      dispatch(loadError(err))
    }
  }
}
