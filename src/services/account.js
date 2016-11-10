/** @flow */
/* eslint-disable camelcase */

import { JsonService } from './json'

type Response = {
  success: boolean,
}

type ErrorResponse<T> = Response & {
  success: false,
  errors: Array<T>,
}

export type User = {
  first_name: string,
  last_name: string,
}

export type LoginSuccess = Response & User & {
  success: true,
  token: string,
}

export type LoginError = 'INVALID_CREDENTIALS'

export type SignUpSuccess = { success: true }

export type SignUpError
  = 'INVALID_EMAIL'        // Invalid email address (empty or malformed)
  | 'EMAIL_ALREADY_EXISTS' // The email already exists
  | 'INVALID_FIRST_NAME'   // Invalid first name (empty)
  | 'INVALID_LAST_NAME'    // Invalid last name (empty)
  | 'INVALID_PASSWORD'     // Invalid password (8 characters min.)

export type LoginResponse = LoginSuccess | ErrorResponse<LoginError>
export type SignUpResponse = SignUpSuccess | ErrorResponse<SignUpError>

export class AccountService extends JsonService {
  login(email: string, password: string): Promise<LoginResponse> {
    return this.request('POST', '/account/login', { email, password })
  }

  signUp(email: string, first_name: string, last_name: string, password: string): Promise<SignUpResponse> {
    return this.request('POST', '/account/create', { email, first_name, last_name, password })
  }
}
