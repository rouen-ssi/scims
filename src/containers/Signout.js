import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as accountActions from '../actions/account'

class Signout extends React.Component {
  render() {
    return null
  }

  componentDidMount() {
    this.props.account.logout()
    this.props.router.push('/signin')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    account: bindActionCreators(accountActions, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(Signout)
