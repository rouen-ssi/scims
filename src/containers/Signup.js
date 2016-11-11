import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Form, Button, Component as FormComponent } from '../components/Form'
import MainContent from '../components/MainContent'

import * as accountActions from '../actions/account'

class Signup extends FormComponent {
  static errors = {
    'Failed to fetch': ['firstname', 'Failed to fetch'],
    'INVALID_EMAIL': ['email', 'Invalid email address (empty or malformed)'],
    'EMAIL_ALREADY_EXISTS': ['email', 'The email already exists'],
    'INVALID_FIRST_NAME': ['firstname', 'Invalid first name (empty)'],
    'INVALID_LAST_NAME': ['lastname', 'Invalid last name (empty)'],
    'INVALID_PASSWORD': ['password', 'Invalid password (8 characters min.)'],
  }

  render() {
    if (this.props.success) {
      this.props.router.push('/signin')
      return null
    }

    return (
      <MainContent side='center'>
        <div className='bloc'>
          <Form onSubmit={this._onSubmit}>
            {this.renderField('firstname', 'Firstname')}
            {this.renderField('lastname', 'Lastname')}
            {this.renderField('email', 'E-mail', {type: 'email'})}
            {this.renderField('password', 'Password', {type: 'password'})}

            <Button type="submit" loading={this.props.loading}>Sign Up</Button>
          </Form>
        </div>
      </MainContent>
    )
  }

  onSubmit({ email, firstname, lastname, password }) {
    this.setState({loading: true})

    this.props.account.sendSignupRequest(
      email,
      firstname,
      lastname,
      password,
    )

    return false
  }
}

function mapStateToProps(state) {
  return {
    loading: state.account.signingUp,
    errors: state.account.signupError || [],
    success: state.account.signupSuccess,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    account: bindActionCreators(accountActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
