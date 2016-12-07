/** @flow */

import { AccountService } from '../../services/account'

import type { User } from '../../services/account'
import type { State } from '../../reducers'

export type Action
  = { type: '@ADMIN/ACCOUNT/LOAD_ALL', accounts: Array<User> }
  | { type: '@ADMIN/ACCOUNT/LOADING' }
  | { type: '@ADMIN/ACCOUNT/LOAD_ERROR', error: Error }

export function loadAll(accounts: Array<User>): Action {
  return { type: '@ADMIN/ACCOUNT/LOAD_ALL', accounts }
}

export function loading(): Action {
  return { type: '@ADMIN/ACCOUNT/LOADING' }
}

export function loadError(error: Error): Action {
  return { type: '@ADMIN/ACCOUNT/LOAD_ERROR', error }
}

export function fetchAll(): Thunk<State, Action> {
  return async function(dispatch, getState) {
    const { account: { token } } = getState()

    if (!token) {
      return
    }
    const accounts = new AccountService(API_URL, token)

    dispatch(loading())
    try {
      const resp = await accounts.fetchAccountsAsAdmin()
      dispatch(loadAll(resp.results))
    } catch (err) {
      dispatch(loadError(err))
    }
  }
}
