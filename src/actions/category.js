/** @flow */

import { CategoryService } from '../services/categories'
import type { Category } from '../services/categories'

export type Action
  = { type: '@CATEGORY/RECEIVE_ALL', categories: Array<Category> }
  | { type: '@CATEGORY/FETCHING' }
  | { type: '@CATEGORY/FETCH_ERROR', error: Error }

export function receiveAll(categories: Array<Category>): Action {
  return { type: '@CATEGORY/RECEIVE_ALL', categories }
}

export function fetching(): Action {
  return { type: '@CATEGORY/FETCHING' }
}

export function fetchError(error: Error): Action {
  return { type: '@CATEGORY/FETCH_ERROR', error }
}

export function fetchAll(): Function {
  const categories = new CategoryService('http://127.0.0.1:3000')

  return async function(dispatch: (action: Action) => void) {
    try {
      dispatch(fetching())
      const resp = await categories.fetchAll()
      dispatch(receiveAll(resp.categories))
    } catch (err) {
      dispatch(fetchError(err))
    }
  }
}
