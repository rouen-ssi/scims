/** @flow */

import type { User, LoginError, SignUpError } from '../services/account'
import type { Action } from '../actions/account'

export type State = {
  currentUser: ?User,

  loggingIn: boolean,
  loginError?: Array<LoginError>,

  signingUp: boolean,
  signupError?: Array<SignUpError>,
  signupSuccess?: boolean,
}

const initialState: State = {
  currentUser: null,

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

    default:
      return state
  }
}
