/** @flow */

import { ArticleService } from '../services/articles'
import type { Article } from '../services/articles'

export type Action
  = { type: '@ARTICLE/LOADING' }
  | { type: '@ARTICLE/LOAD_ERROR', error: Error }
  | { type: '@ARTICLE/PUSH_ARTICLE', article: Article }
  | { type: '@ARTICLE/XPUSH_ARTICLE', articles: Array<Article> }

export function loading(): Action {
  return { type: '@ARTICLE/LOADING' }
}

export function loadError(error: Error): Action {
  return { type: '@ARTICLE/LOAD_ERROR', error }
}

export function pushArticles(articles: Array<Article>): Action {
  return { type: '@ARTICLE/XPUSH_ARTICLE', articles }
}

export function fetchArticlesByCategory(categoryId: number, page?: number): Function {
  const articles = new ArticleService('http://127.0.0.1:3000')

  return async function(dispatch: (action: Action) => void) {
    dispatch(loading())
    try {
      const result = await articles.fetch(page, categoryId)
      dispatch(pushArticles(result.articles))
    } catch (err) {
      dispatch(loadError(err))
    }
  }
}
