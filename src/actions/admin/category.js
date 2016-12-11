/** @flow */

import { CategoryService } from '../../services/categories'
import * as actions from '../category'

import type { Category } from '../../services/categories'
import type { Action } from '../category'
import type { State } from '../../reducers'

export function requestCreation(category: Category): Thunk<State, Action> {
  return async function(dispatch, getState) {
    const { account: { token } } = getState()

    if (!token) {
      return
    }

    const categories = new CategoryService(API_URL, token)

    const { result } = await categories.createAsAdmin(category)
    dispatch(actions.receive(result))
  }
}

export function requestUpdate(category: Category): Thunk<State, Action> {
  return async function(dispatch, getState) {
    const { account: { token } } = getState()

    if (!token) {
      return
    }

    const categories = new CategoryService(API_URL, token)

    const { result } = await categories.updateAsAdmin(category)
    dispatch(actions.receive(result))
  }
}

export function requestDeletion(category: Category): Thunk<State, Action> {
  return async function(dispatch, getState) {
    const { account: { token } } = getState()

    if (!token) {
      return
    }

    const categories = new CategoryService(API_URL, token)

    await categories.deleteAsAdmin(category.id)
    dispatch(actions.remove(category))
  }
}
