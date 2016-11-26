/** @flow */

import { connect } from 'react-redux'

import { DraftScreen } from '../components/DraftScreen'

import type { State } from '../reducers'

function mapStateToProps(state: State): any {
  return {
    currentUser: state.account.currentUser,
  }
}

function mapDispatchToProps(_dispatch: (_: any) => void): any {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DraftScreen)
