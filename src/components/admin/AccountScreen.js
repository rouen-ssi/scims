/** @flow */

import React from 'react'

import { Spinner } from '../Spinner'

import type { User } from '../../services/account'

export type Props = {
  loading: boolean,
  accounts: Array<User>,
}

export class AccountScreen extends React.Component {
  props: Props

  render() {
    if (this.props.loading) {
      return <Spinner/>
    }
    return <span>{this.props.accounts.length} loaded</span>
  }
}
