/** @flow */

import { connect } from 'react-redux'

import { Header } from '../components/Header'

import * as articleActions from '../actions/article'
import type { State } from '../reducers'

function mapStateToProps(state: State) {
  return {
    logged: !!state.account.currentUser,
    drafts: state.articles.drafts.valueSeq().toJS(),
  }
}

function mapDispatchToProps(dispatch: (_: any) => void) {
  return {
    loadDrafts() {
      dispatch(articleActions.fetchDrafts())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
