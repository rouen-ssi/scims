/** @flow */

import { AccountService } from '../../services/account'

import type { User } from '../../services/account'
import type { State } from '../../reducers'

export type Action
  = { type: '@ADMIN/ACCOUNT/LOAD_ALL', accounts: Array<User> }
  | { type: '@ADMIN/ACCOUNT/LOADING' }
  | { type: '@ADMIN/ACCOUNT/LOAD_ERROR', error: Error }
  | { type: '@ADMIN/ACCOUNT/CREATE', account: User }
  | { type: '@ADMIN/ACCOUNT/UPDATE', account: User }
  | { type: '@ADMIN/ACCOUNT/DELETE', account: User }

export function loadAll(accounts: Array<User>): Action {
  return { type: '@ADMIN/ACCOUNT/LOAD_ALL', accounts }
}

export function loading(): Action {
  return { type: '@ADMIN/ACCOUNT/LOADING' }
}

export function loadError(error: Error): Action {
  return { type: '@ADMIN/ACCOUNT/LOAD_ERROR', error }
}

export function createAccount(account: User): Action {
  return { type: '@ADMIN/ACCOUNT/CREATE', account }
}

export function updateAccount(account: User): Action {
  return { type: '@ADMIN/ACCOUNT/UPDATE', account }
}

export function deleteAccount(account: User): Action {
  return { type: '@ADMIN/ACCOUNT/DELETE', account }
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

export function requestCreation(account: User): Thunk<State, Action> {
  return async function(dispatch, getState) {
    const { account: { token } } = getState()

    if (!token) {
      return
    }
    const accounts = new AccountService(API_URL, token)

    const { result } = await accounts.createAccountAsAdmin(account)
    dispatch(createAccount(result))
  }
}

export function requestUpdate(account: User): Thunk<State, Action> {
  return async function(dispatch, getState) {
    const { account: { token } } = getState()

    if (!token) {
      return
    }
    const accounts = new AccountService(API_URL, token)

    const { result } = await accounts.updateAccountAsAdmin(account)
    dispatch(updateAccount(result))
  }
}

export function requestDeletion(account: User): Thunk<State, Action> {
  return async function(dispatch, getState) {
    const { account: { token } } = getState()

    if (!token) {
      return
    }
    const accounts = new AccountService(API_URL, token)

    await accounts.deleteAccountAsAdmin(account.uid)
    dispatch(deleteAccount(account))
  }
}
