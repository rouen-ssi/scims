/** @flow */

import React from 'react'
import ReactDOM from 'react-dom'
import cx from 'classnames'
import { wrapPreventDefault } from '../../utils'

import { Icon } from '../icons/FontAwesome'
import { Spinner } from '../Spinner'

import { emptyAccount } from '../../services/account'
import type { User } from '../../services/account'

export type Props = {
  loading: boolean,
  accounts: Array<User>,
  createAccount: (account: User) => Promise<*>,
  updateAccount: (account: User) => Promise<*>,
  deleteAccount: (account: User) => Promise<*>,
}

function Button({onClick, children, ...props}: {onClick: () => void, children?: React$Element<*>}) {
  return (
    <a href="#" onClick={wrapPreventDefault(onClick)} {...props}>{children}</a>
  )
}

function RowInput(props: { editing: boolean, value: string, onChange: (value: string) => void, onUpdate: () => void }) {
  if (!props.editing) {
    return <span>{props.value}</span>
  } else {
    return <input type="text" value={props.value} onChange={(e: Event) => {
      e.preventDefault()
      // $FlowFixMe: This type is incompatible with
      props.onChange((e.target: HTMLInputElement).value)
      return false
    }} onKeyDown={(e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        props.onUpdate()
      }
    }}/>
  }
}

function RowSelect(props: { editing: boolean, values: Array<string>, value: string, onChange: (value: string) => void }) {
  if (props.editing) {
    return (
      <select value={props.value} onChange={(e: Event) => {
        // $FlowFixMe: This type is incompatible with
        props.onChange((e.target: HTMLSelectElement).value)
      }}>
        {props.values.map((x, i) => (
          <option value={x} key={i}>{x}</option>
        ))}
      </select>
    )
  }

  return <span>{props.value}</span>
}

type RowProps = {
  user: User,
  updateAccount: (account: User) => Promise<*>,
  deleteAccount: (account: User) => Promise<*>,
}

class Row extends React.Component {
  props: RowProps

  state = {
    editing: false,
    editingUser: this.props.user,
    loading: false,
  }

  componentWillReceiveProps(nextProps: RowProps) {
    this.setState({ editingUser: nextProps.user })
  }

  render() {
    const { editing, loading, editingUser: user } = this.state

    return (
      <tr className={cx({ editing })}>
        <td><RowInput editing={editing} value={user.email} onChange={this._onChange('email')} onUpdate={this._onUpdate}/></td>
        <td><RowInput editing={editing} value={user.first_name} onChange={this._onChange('first_name')} onUpdate={this._onUpdate}/></td>
        <td><RowInput editing={editing} value={user.last_name} onChange={this._onChange('last_name')} onUpdate={this._onUpdate}/></td>
        <td>
          <RowSelect editing={editing} value={user.role} values={['user', 'admin']} onChange={this._onChange('role')}/>
        </td>
        <td className="action">
          <Button onClick={this._onUpdate}>
            {editing ? loading ? <Spinner/> : <Icon type="floppy-o"/> : <Icon type="pencil"/>}
          </Button>
        </td>
        <td className="action">
          {!editing && <Button onClick={this._onDelete}>
            { loading ? <Spinner/> : <Icon type="trash"/>}
          </Button>}
        </td>
      </tr>
    )
  }

  _onUpdate = () => {
    if (this.state.editing) {
      this.setState({ loading: true }, () => {
        this.props.updateAccount(this.state.editingUser)
        .then(() => this.setState({ loading: false, editing: false }))
      })
    } else {
      this.setState({ editing: true }, () => {
        if (this.state.editing) {
          const input: Array<HTMLInputElement> = ReactDOM.findDOMNode(this).getElementsByTagName('input')
          input[0].focus()
        }
      })
    }
  }

  _onDelete = () => {
    this.setState({ loading: true }, () => {
      this.props.deleteAccount(this.props.user)
    })
  }

  _onChange = (fieldName: string) => {
    return (value: any) => {
      this.setState({
        editingUser: {
          ...this.state.editingUser,
          [fieldName]: value,
        },
      })
    }
  }
}

class DraftRow extends React.Component {
  props: {
    createAccount: (account: User) => Promise<*>,
  }

  state = {
    editing: false,
    loading: false,
    account: emptyAccount(),
  }

  render() {
    if (!this.state.editing) {
      return (
        <tr>
          <td colSpan="6" style={{textAlign: 'center'}}>
            <Button onClick={this._startEditing}>
              <Icon type="user-plus"/>{' '}
              New Account
            </Button>
          </td>
        </tr>
      )
    }

    return (
      <tr className="editing">
        <td>
          <RowInput editing value={this.state.account.email} onChange={this._onChange('email')} onUpdate={this._onCreate}/>
        </td>
        <td>
          <RowInput editing value={this.state.account.first_name} onChange={this._onChange('first_name')} onUpdate={this._onCreate}/>
        </td>
        <td>
          <RowInput editing value={this.state.account.last_name} onChange={this._onChange('last_name')} onUpdate={this._onCreate}/>
        </td>
        <td>
          <RowSelect editing value={this.state.account.role} values={['user', 'admin']} onChange={this._onChange('role')} />
        </td>
        <td>
          <Button onClick={this._onCreate}>
            {this.state.loading ? <Spinner/> : <Icon type="floppy-o"/>}
          </Button>
        </td>
        <td></td>
      </tr>
    )
  }

  _startEditing = () => {
    this.setState({
      account: emptyAccount(),
      editing: true,
    }, () => {
      ReactDOM.findDOMNode(this).querySelector('input').focus()
    })
  }

  _onChange = (fieldName: string) => (fieldValue: string) => {
    this.setState({
      account: {
        ...this.state.account,
        [fieldName]: fieldValue,
      },
    })
  }

  _onCreate = () => {
    this.setState({ loading: true }, () => {
      this.props.createAccount(this.state.account).then(() => {
        this.setState({ loading: false, editing: false })
      })
    })
  }
}

export class AccountScreen extends React.Component {
  props: Props

  render() {
    if (this.props.loading) {
      return <Spinner/>
    }
    return (
      <table style={{marginBottom: '3em'}}>
        <thead>
          <tr>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th/>
            <th/>
          </tr>
        </thead>

        <tbody>
          {this.props.accounts.map((x, i) => (
            <Row key={i} user={x}
                 updateAccount={this.props.updateAccount}
                 deleteAccount={this.props.deleteAccount}/>
          ))}

          <DraftRow createAccount={this.props.createAccount}/>
        </tbody>
      </table>
    )
  }
}
