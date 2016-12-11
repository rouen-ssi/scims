/** @flow */
import { connect } from 'react-redux'

import { RegisterScreen } from '../components/RegisterScreen'

import * as accountActions from '../actions/account'
import type { State } from '../reducers'
import type { User } from '../services/account'

function mapStateToProps(state: State): Object {
  return {
    loading: state.account.loggingIn,
    errors: state.account.loginError || [],
    user: state.account.currentUser,
  }
}

function mapDispatchToProps(dispatch: (_: any) => void): Object {
  return {
    register(account: User, newPassword: string) {
      dispatch(accountActions.requestRegistration(account, newPassword))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
