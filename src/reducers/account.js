/** @flow */

import type { User, LoginError, SignUpError } from '../services/account'
import type { Action } from '../actions/account'

export type State = {
  currentUser: ?User,
  token: ?string,

  loggingIn: boolean,
  loginError?: Array<LoginError>,

  signingUp: boolean,
  signupError?: Array<SignUpError>,
  signupSuccess?: boolean,
}

const initialState: State = {
  currentUser: null,
  token: loadToken(),

  loggingIn: false,
  signingUp: false,
}

export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case '@ACCOUNT/SIGNING_UP':
      return {
        ...state,
        signingUp: true,
        signupError: undefined,
        signupSuccess: false,
      }

    case '@ACCOUNT/SIGNUP_ERROR':
      return {
        ...state,
        signingUp: false,
        signupError: action.errors,
        signupSuccess: false,
      }

    case '@ACCOUNT/SIGNUP_SUCCESS':
      return {
        ...state,
        signingUp: false,
        signupError: undefined,
        signupSuccess: true,
      }

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
      return initialState

    default:
      return state
  }
}

export function loadToken(): ?string {
  if (typeof window === 'undefined') {
    return null
  }

  const data = window.localStorage['@@SCIMS/1.0/reducers/account']

  if (data) {
    const { token } = JSON.parse(data)
    return token
  }

  return null
}

function persistToken(token: ?string): ?string {
  window.localStorage['@@SCIMS/1.0/reducers/account'] = JSON.stringify({ token })
  return token
}
