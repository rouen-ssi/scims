/** @flow */

import { connect } from 'react-redux'

import { AccountScreen } from '../../components/admin/AccountScreen'
import * as accountActions from '../../actions/admin/account'

import type { State } from '../../reducers'
import type { User } from '../../services/account'

function mapStateToProps(state: State): Object {
  return {
    loading: state.admin.account.loading,
    accounts: state.admin.account.accounts,
  }
}

function mapDispatchToProps(dispatch: (_: any) => void): Object {
  return {
    createAccount(account: User) {
      return dispatch(accountActions.requestCreation(account))
    },
    updateAccount(account: User) {
      return dispatch(accountActions.requestUpdate(account))
    },
    deleteAccount(account: User) {
      return dispatch(accountActions.requestDeletion(account))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen)
