/** @flow */

import { AccountService } from '../services/account'
import type { SignUpError, LoginError, UpdateProfileError, User } from '../services/account'
import type { State } from '../reducers/account'

export type Action
  = { type: '@ACCOUNT/SIGNING_UP' }
  | { type: '@ACCOUNT/SIGNUP_ERROR', errors: Array<SignUpError> }
  | { type: '@ACCOUNT/SIGNUP_SUCCESS' }
  | { type: '@ACCOUNT/LOGGING_IN' }
  | { type: '@ACCOUNT/LOGIN_ERROR', errors: Array<LoginError> }
  | { type: '@ACCOUNT/LOGIN_SUCCESS', user: User, token: string }
  | { type: '@ACCOUNT/LOGOUT' }
  | { type: '@ACCOUNT/PROFILE_UPDATING' }
  | { type: '@ACCOUNT/PROFILE_UPDATED' }
  | { type: '@ACCOUNT/PROFILE_UPDATE_ERROR', errors: Array<UpdateProfileError> }

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

export function profileUpdating(): Action {
  return { type: '@ACCOUNT/PROFILE_UPDATING' }
}

export function profileUpdated(): Action {
  return { type: '@ACCOUNT/PROFILE_UPDATED' }
}

export function profileUpdateError(errors: Array<UpdateProfileError>): Action {
  return { type: '@ACCOUNT/PROFILE_UPDATE_ERROR', errors }
}

export function sendSignupRequest(email: string, firstName: string, lastName: string, password: string): Function {
  const accounts = new AccountService(API_URL)

  return async function(dispatch: (action: Action) => void) {
    dispatch(signingUp())

    try {
      const resp = await accounts.signUp(email, firstName, lastName, password)

      if (resp.success) {
        dispatch(signupSuccess())
      } else {
        dispatch(signupError(resp.errors))
      }
    } catch (err) {
      dispatch(signupError([err.message]))
    }
  }
}

export function sendLoginRequest(email: string, password: string): Function {
  const accounts = new AccountService(API_URL)

  return async function(dispatch: (action: Action) => void) {
    dispatch(loggingIn())

    try {
      const resp = await accounts.login(email, password)

      if (resp.success) {
        dispatch(loginSuccess(resp, resp.token))
      } else {
        dispatch(loginError(resp.errors))
      }
    } catch (err) {
      dispatch(loginError([err.message]))
    }
  }
}

export function sendUpdateProfileRequest(): Function {
  return async function(dispatch: (action: Action) => void, getState: () => { account: State }) {
    const {currentUser, token} = getState().account

    if (!currentUser || !token) {
      return
    }

    const accounts = new AccountService('API_URL', token)

    try {
      dispatch(profileUpdating())
      const resp = await accounts.updateProfile(currentUser)

      if (resp.success) {
        dispatch(profileUpdated())
      } else {
        dispatch(profileUpdateError(resp.errors))
      }
    } catch (err) {
      dispatch(profileUpdateError([err.message]))
    }
  }
}
