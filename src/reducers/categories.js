/** @flow */

import type { Category } from '../services/categories'
import type { Action } from '../actions/category'

export type State = {
  categories: Array<Category>,
  fetching: boolean,
  lastError: ?Error,
}

const initialState: State = {
  categories: [],
  fetching: false,
  lastError: null,
}

export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case '@CATEGORY/RECEIVE_ALL':
      return {
        ...state,
        categories: action.categories,
        fetching: false,
        lastError: null,
      }

    case '@CATEGORY/FETCHING':
      return {
        ...state,
        fetching: true,
        lastError: null,
      }

    case '@CATEGORY/FETCH_ERROR':
      return {
        ...state,
        fetching: false,
        lastError: action.error,
      }

    default:
      return state
  }
}
