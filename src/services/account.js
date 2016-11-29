/** @flow */
/* eslint-disable camelcase */

import { JsonService } from './json'

type ErrorResponse<T> = {
  success: false,
  errors: Array<T>,
}

type SuccessResponse = {
  success: true,
}

export type User = {
  uid: string,
  email: string,
  first_name: string,
  last_name: string,
  biography: string,
}

export type LoginSuccess = SuccessResponse & {
  token: string,
  user: User,
}

export type LoginError = 'INVALID_CREDENTIALS' // Invalid e-mail or password

export type UpdateProfileError
  = 'INVALID_FIRST_NAME'   // Invalid first name (empty)
  | 'INVALID_LAST_NAME'    // Invalid last name (empty)

export type SignUpError
  = 'INVALID_EMAIL'        // Invalid email address (empty or malformed)
  | 'EMAIL_ALREADY_EXISTS' // The email already exists
  | 'INVALID_PASSWORD'     // Invalid password (8 characters min.)
  | UpdateProfileError

export type ChangePasswordError
  = 'INVALID_OLD_PASSWORD' // You must supply a valid password
  | 'INVALID_NEW_PASSWORD' // Your new password should be at least 8 characters long

export type LoginResponse = LoginSuccess | ErrorResponse<LoginError>
export type SignUpResponse = SuccessResponse | ErrorResponse<SignUpError>
export type ChangePasswordResponse = SuccessResponse | ErrorResponse<ChangePasswordError>
export type UpdateProfileResponse = SuccessResponse | ErrorResponse<UpdateProfileError>

export class AccountService extends JsonService {
  login(email: string, password: string): Promise<LoginResponse> {
    return this.request('POST', '/account/login', { email, password })
  }

  signUp(email: string, first_name: string, last_name: string, password: string): Promise<SignUpResponse> {
    return this.request('POST', '/account/create', { email, first_name, last_name, password })
  }

  changePassword(old_password: string, new_password: string): Promise<ChangePasswordResponse> {
    return this.authRequest('PUT', '/account/password', { old_password, new_password })
  }

  updateProfile(user: User): Promise<UpdateProfileResponse> {
    return this.authRequest('PUT', '/account', user)
  }
}
