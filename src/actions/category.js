/** @flow */

import { CategoryService } from '../services/categories'
import type { Category } from '../services/categories'

import { ArticleService } from '../services/articles'
import type { Article } from '../services/articles'

import type { State } from '../reducers'

export type Action
  = { type: '@CATEGORY/RECEIVE_ALL', categories: Array<Category> }
  | { type: '@CATEGORY/RECEIVE', category: Category, articles: Array<Article> }
  | { type: '@CATEGORY/FETCHING' }
  | { type: '@CATEGORY/FETCH_ERROR', error: Error }

export function receiveAll(categories: Array<Category>): Action {
  return { type: '@CATEGORY/RECEIVE_ALL', categories }
}

export function receive(category: Category, articles: Array<Article>): Action {
  return { type: '@CATEGORY/RECEIVE', category, articles }
}

export function fetching(): Action {
  return { type: '@CATEGORY/FETCHING' }
}

export function fetchError(error: Error): Action {
  return { type: '@CATEGORY/FETCH_ERROR', error }
}

export function fetchCategory(categoryId: number): Function {
  const categories = new CategoryService(API_URL)
  const articles = new ArticleService(API_URL)

  return async function(dispatch: (action: Action) => void, getState: () => State) {
    const state = getState()

    if (state.categories.articles.has(categoryId)) {
      return
    }

    dispatch(fetching())
    try {
      const category = await categories.fetchCategory(categoryId)
      const {articles: articleList} = await articles.fetch(undefined, categoryId)
      dispatch(receive(category, articleList))
    } catch (err) {
      dispatch(fetchError(err))
    }
  }
}

export function fetchAll(): Function {
  const categories = new CategoryService(API_URL)

  return async function(dispatch: (action: Action) => void, getState: () => State) {
    const state = getState()

    if (!state.categories.categories.isEmpty()) {
      return
    }

    try {
      dispatch(fetching())
      const resp = await categories.fetchAll()
      dispatch(receiveAll(resp.categories))
    } catch (err) {
      dispatch(fetchError(err))
    }
  }
}
