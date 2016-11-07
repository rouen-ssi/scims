/** @flow */
import React from 'react'
import { connect } from 'react-redux'

import MainContent from './MainContent'
import { Form, Button, Component } from './Form'

type FormData = {
  email: string,
  password: string,
}

class Signin extends Component {
  static errors = {

  }

  render() {
    return (
      <MainContent>
        <div className="bloc">
          <Form onSubmit={this._onSubmit}>
            {this.renderField('email', 'E-mail', {type: 'email'})}
            {this.renderField('password', 'Password', {type: 'password'})}

            <Button type="submit">Sign in</Button>
          </Form>
        </div>
      </MainContent>
    )
  }

  onSubmit({ email, password }: FormData) {

  }
}

export default connect()(Signin)
