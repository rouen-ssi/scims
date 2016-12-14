/** @flow */

import { persistToken } from '../reducers/account'
import { AccountService } from '../services/account'
import type { SignUpError, LoginError, User } from '../services/account'
import type { State } from '../reducers'

export type Action
  = { type: '@ACCOUNT/SIGNING_UP' }
  | { type: '@ACCOUNT/SIGNUP_ERROR', errors: Array<SignUpError> }
  | { type: '@ACCOUNT/SIGNUP_SUCCESS' }
  | { type: '@ACCOUNT/LOGGING_IN' }
  | { type: '@ACCOUNT/LOGIN_ERROR', errors: Array<LoginError> }
  | { type: '@ACCOUNT/LOGIN_SUCCESS', user: User, token: string }
  | { type: '@ACCOUNT/LOGOUT' }

export function signingUp(): Action {
  return { type: '@ACCOUNT/SIGNING_UP' }
}

export function signupError(errors: Array<SignUpError>): Action {
  return { type: '@ACCOUNT/SIGNUP_ERROR', errors }
}

export function signupSuccess(): Action {
  return { type: '@ACCOUNT/SIGNUP_SUCCESS' }
}

export function loggingIn(): Action {
  return { type: '@ACCOUNT/LOGGING_IN' }
}

export function loginError(errors: Array<LoginError>): Action {
  return { type: '@ACCOUNT/LOGIN_ERROR', errors }
}

export function loginSuccess(user: User, token: string): Action {
  return { type: '@ACCOUNT/LOGIN_SUCCESS', user, token }
}

export function logout(): Action {
  return { type: '@ACCOUNT/LOGOUT' }
}

export function sendLoginRequest(email: string, password: string): Thunk<State, Action> {
  const accounts = new AccountService(API_URL)

  return async function(dispatch) {
    dispatch(loggingIn())

    try {
      const resp = await accounts.login(email, password)

      if (resp.success) {
        dispatch(loginSuccess(resp.account, resp.token))
      } else {
        dispatch(loginError(resp.errors))
      }
    } catch (err) {
      dispatch(loginError([err.message]))
    }
  }
}

export function fetchProfile(newToken?: string): Thunk<State, Action> {
  return async function(dispatch, getState) {
    const state = getState()
    const token = newToken || state.account.token

    if (!token) {
      return
    }

    const accounts = new AccountService(API_URL, token)
    dispatch(loggingIn())
    try {
      const resp = await accounts.profile()
      dispatch(loginSuccess(resp.user, token))
    } catch (err) {
      dispatch(loginError([err.message]))
      persistToken(null)
    }
  }
}

export function requestRegistration(account: User, newPassword: string): Thunk<State, Action> {
  return async function(dispatch, getState) {
    const { account: { token } } = getState()

    if (!token) {
      return
    }

    const accounts = new AccountService(API_URL, token)

    dispatch(loggingIn())
    try {
      await accounts.changePassword(newPassword)
      await accounts.updateProfile(account)
    } catch (err) {
      dispatch(loginError([err.message]))
    }
  }
}
