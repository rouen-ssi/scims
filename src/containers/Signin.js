import React from 'react'
import { connect } from 'react-redux'

import MainContent from '../components/MainContent'
import { Form, Button, Component } from '../components/Form'

import { bindActionCreators } from 'redux'
import * as accountActions from '../actions/account'

class Signin extends Component {
  static errors = {
    'INVALID_CREDENTIALS': ['email', 'E-mail or password not found in our database'],
  }

  state = {
    form: {
      email: '',
      password: '',
    },
  }

  render() {
    return (
      <MainContent side="center">
        <div className="bloc">
          <Form onSubmit={this._onSubmit}>
            {this.renderField('email', 'E-mail', {type: 'email'})}
            {this.renderField('password', 'Password', {type: 'password'})}

            <Button type="submit" loading={this.props.loading}>Sign in</Button>
          </Form>
        </div>
      </MainContent>
    )
  }

  async onSubmit({ email, password }) {
    await this.props.account.sendLoginRequest(email, password)
    this.props.router.push('/')
  }
}

function mapStateToProps(state) {
  return {
    loading: state.account.loggingIn,
    errors: state.account.loginError || [],
    success: state.account.loginSuccess,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    account: bindActionCreators(accountActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
