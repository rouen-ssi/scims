/** @flow */

import React from 'react'

import { Table } from './Table'

import type { User } from '../../services/account'

export type Props = {
  loading: boolean,
  accounts: Array<User>,
  createAccount: (account: User) => Promise<*>,
  updateAccount: (account: User) => Promise<*>,
  deleteAccount: (account: User) => Promise<*>,
}

// function RowSelect(props: { editing: boolean, values: Array<string>, value: string, onChange: (value: string) => void }) {
//   if (props.editing) {
//     return (
//       <select value={props.value} onChange={(e: Event) => {
//         props.onChange((e.target: HTMLSelectElement).value)
//       }}>
//         {props.values.map((x, i) => (
//           <option value={x} key={i}>{x}</option>
//         ))}
//       </select>
//     )
//   }
//
//   return <span>{props.value}</span>
// }

export class AccountScreen extends React.Component {
  props: Props

  render() {
    return (
      <Table
        loading={this.props.loading}
        items={this.props.accounts}
        fields={{
          email: 'Email',
          first_name: 'First Name',
          last_name: 'Last Name',
          role: 'Role',
        }}
        createItem={this.props.createAccount}
        updateItem={this.props.updateAccount}
        deleteItem={this.props.deleteAccount}
      />
    )
  }
}
