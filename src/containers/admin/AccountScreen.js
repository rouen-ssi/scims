/** @flow */

import { connect } from 'react-redux'

import { AccountScreen } from '../../components/admin/AccountScreen'

import type { State } from '../../reducers'

function mapStateToProps(state: State): Object {
  return {
    loading: state.admin.account.loading,
    accounts: state.admin.account.accounts,
  }
}

export default connect(mapStateToProps)(AccountScreen)
