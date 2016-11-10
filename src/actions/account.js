/** @flow */

import { AccountService } from '../services/account'
import type { SignUpError } from '../services/account'

export type Action
  = { type: '@ACCOUNT/SIGNING_UP' }
  | { type: '@ACCOUNT/SIGNUP_ERROR', errors: Array<SignUpError> }
  | { type: '@ACCOUNT/SIGNUP_SUCCESS' }

export function signingUp(): Action {
  return { type: '@ACCOUNT/SIGNING_UP' }
}

export function signupError(errors: Array<SignUpError>): Action {
  return { type: '@ACCOUNT/SIGNUP_ERROR', errors }
}

export function signupSuccess(): Action {
  return { type: '@ACCOUNT/SIGNUP_SUCCESS' }
}

export function sendSignupRequest(email: string, firstName: string, lastName: string, password: string): Function {
  const accounts = new AccountService('http://127.0.0.1:3000')

  return async function(dispatch: Function) {
    dispatch(signingUp())

    try {
      const resp = await accounts.signUp(email, firstName, lastName, password)

      if (resp.success) {
        dispatch(signupSuccess())
      } else {
        dispatch(signupError(resp.errors))
      }
    } catch (err) {
      console.error(err)
      dispatch(signupError([err.message]))
    }
  }
}
