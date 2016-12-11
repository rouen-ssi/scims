/** @flow */

import type { User, LoginError } from '../services/account'
import type { Action } from '../actions/account'

export type State = {
  currentUser: ?User,
  token: ?string,

  loggingIn: boolean,
  loginError?: Array<LoginError>,
}

const initialState: State = {
  currentUser: null,
  token: loadToken(),
  loggingIn: false,
}

export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case '@ACCOUNT/LOGGING_IN':
      return {
        ...state,
        loggingIn: true,
        loginError: undefined,
        loginSuccess: false,
      }

    case '@ACCOUNT/LOGIN_ERROR':
      return {
        ...state,
        loggingIn: false,
        loginError: action.errors,
        loginSuccess: false,
        token: null,
        currentUser: null,
      }

    case '@ACCOUNT/LOGIN_SUCCESS':
      return {
        ...state,
        currentUser: action.user,
        token: persistToken(action.token),

        loggingIn: false,
        loginError: undefined,
        loginSuccess: true,

        signingUp: false,
        signupError: undefined,
        signupSuccess: true,
      }

    case '@ACCOUNT/LOGOUT':
      persistToken(null)
      return initialState

    default:
      return state
  }
}

export function loadToken(): ?string {
  const data = window.localStorage['@@SCIMS/1.0/reducers/account']

  if (data) {
    const { token } = JSON.parse(data)
    return token
  }

  return null
}

export function persistToken(token: ?string): ?string {
  window.localStorage['@@SCIMS/1.0/reducers/account'] = JSON.stringify({ token })
  return token
}
