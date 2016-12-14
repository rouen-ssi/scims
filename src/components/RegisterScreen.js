/** @flow */
import React from 'react'

import { Form, Button, Component as FormComponent } from './Form'
import MainContent from './MainContent'

import { emptyAccount } from '../services/account'
import type { User } from '../services/account'

export type Props = {
  success: boolean,
  loading: boolean,
  errors: Array<string>,
  user: ?User,
  router: Router,
  register: (account: User, password: string) => Promise<*>,
}

export type State = {
  form: Object,
}

export class RegisterScreen extends FormComponent<{}, Props, State> {
  static errors = {
    'Failed to fetch': ['firstname', 'Failed to fetch'],
    'INVALID_EMAIL': ['email', 'Invalid email address (empty or malformed)'],
    'EMAIL_ALREADY_EXISTS': ['email', 'The email already exists'],
    'INVALID_FIRST_NAME': ['first_name', 'Invalid first name (empty)'],
    'INVALID_LAST_NAME': ['last_name', 'Invalid last name (empty)'],
    'INVALID_PASSWORD': ['password', 'Invalid password (8 characters min.)'],
  }

  state = {
    form: this.props.user || emptyAccount(),
  }

  render() {
    return (
      <MainContent side='center'>
        <div className='bloc'>
          <Form onSubmit={this._onSubmit}>
            {this.renderField('first_name', 'Firstname')}
            {this.renderField('last_name', 'Lastname')}
            {this.renderField('email', 'E-mail', {type: 'email'})}
            {this.renderField('password', 'Password', {type: 'password'})}

            <Button type="submit" loading={this.props.loading}>Sign Up</Button>
          </Form>
        </div>
      </MainContent>
    )
  }

  async onSubmit({password, ...params}: $Shape<User> & { password: string }) {
    await this.props.register(Object.assign(emptyAccount(), params), password)
    this.props.router.replace('/')
  }
}
