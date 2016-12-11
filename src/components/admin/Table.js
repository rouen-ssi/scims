/** @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import cx from 'classnames'
import { wrapPreventDefault } from '../../utils'

import { Spinner } from '../Spinner'
import { Icon } from '../icons/FontAwesome'
import { Modal } from '../Modal'

/**
 * Essentially this describes what gets shown by the Table component.
 * It is specifications about the data and how it gets displayed.
 */
export type Fields = {
  [field: string]: string,
}

/**
 * Because {Object.entries(obj)} is too restrictive.
 */
function entries(obj: Fields): Array<[string, string]> {
  const result = []

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result.push([key, obj[key]])
    }
  }

  return result
}

/** Table ** Props & State */

export type TableProps = {
  loading: boolean,
  items: Array<Object>,
  fields: Fields,
  createItem: (item: Object) => Promise<*>,
  updateItem: (item: Object) => Promise<*>,
  deleteItem: (item: Object) => Promise<*>,
}

/** Row ** Props & State */

type RowProps = {
  item: Object,
  fields: Fields,
  updateItem: (item: Object) => Promise<*>,
  deleteItem: (item: Object) => Promise<*>,
}

type RowState = {
  editing: boolean,
  deleting: boolean,
  loading: boolean,
  currentItem: Object,
}

/** DraftRow ** Props & State */

type DraftRowProps = {
  fields: Fields,
  createItem: (item: Object) => Promise<*>,
}

type DraftRowState = {
  editing: boolean,
  loading: boolean,
  item: Object,
}

/**
 * Abstract a dumb clickable area
 */
function Button({onClick, children, ...props}: {onClick: () => void, children?: React$Element<*>}) {
  return (
    <a href="#" onClick={wrapPreventDefault(onClick)} {...props}>{children}</a>
  )
}

/**
 * A RowInput displays a string or provides a way to update it
 * Based on current row's editing state.
 */
function RowInput(props: { editing: boolean, value: string, placeholder?: string, onChange: (value: string) => void, onUpdate: () => void }) {
  if (!props.editing) {
    return <span>{props.value}</span>
  } else {
    return <input type="text" value={props.value} placeholder={props.placeholder} onChange={(e: Event) => {
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

/**
 * A Row is simply a collection of RowInputs with two more buttons in order to
 * update or delete a given item. A Modal is displayed before deleting the item
 * to prevent accidental deletions.
 */
class Row extends React.Component<*, RowProps, RowState> {
  state = {
    editing: false,
    deleting: false,
    loading: false,
    currentItem: this.props.item,
  }

  componentWillReceiveProps(nextProps: RowProps) {
    this.setState({ currentItem: nextProps.item })
  }

  render() {
    const { editing, loading, deleting, currentItem } = this.state

    return (
      <tr className={cx({ editing })}>
        {Object.keys(this.props.fields).map((key) => (
          <td key={key}>
            <RowInput editing={editing} value={currentItem[key]}
                      onChange={this._onChange(key)}
                      onUpdate={this._onUpdate}
            />
          </td>
        ))}
        <td className="action">
          <Button onClick={this._onUpdate}>
            {editing ? loading ? <Spinner/> : <Icon type="floppy-o"/> : <Icon type="pencil"/>}
          </Button>
        </td>
        <td className="action">
          <Modal active={deleting} title="Confirm destructive operation."
                 onConfirm={this._doDelete} onClose={() => this.setState({ deleting: false })}>
            Are you sure?
          </Modal>

          {!editing && <Button onClick={this._onDelete}>
            { loading ? <Spinner/> : <Icon type="trash"/> }
          </Button>}
        </td>
      </tr>
    )
  }

  _onChange = (key: string) => (value: *) => {
    this.setState({
      currentItem: {
        ...this.state.currentItem,
        [key]: value,
      },
    })
  }

  _onUpdate = () => {
    if (this.state.editing) {
      this.setState({ loading: true }, () => {
        this.props.updateItem(this.state.currentItem)
        .then(() => this.setState({ loading: false, editing: false }))
      })
    } else {
      this.setState({ editing: true }, () => {
        ReactDOM.findDOMNode(this).querySelector('input').focus()
      })
    }
  }

  _onDelete = () => {
    this.setState({ deleting: true })
  }

  _doDelete = () => {
    this.setState({ loading: true, deleting: false }, () => {
      this.props.deleteItem(this.props.item).then(() => {
        this.setState({ loading: false })
      })
    })
  }
}

/**
 * A DraftRow is kind of a pimped Row to make it work with empty data
 * that needs to be inserted instead of updated.
 */
class DraftRow extends React.Component<*, DraftRowProps, DraftRowState> {
  state = {
    editing: false,
    loading: false,
    item: {},
  }

  render() {
    if (!this.state.editing) {
      return (
        <tr>
          <td colSpan={Object.keys(this.props.fields).length + 2} style={{textAlign: 'center'}}>
            <Button onClick={this._startEditing}>
              <Icon type="plus"/>{' '}
              New Item
            </Button>
          </td>
        </tr>
      )
    }

    const { item } = this.state

    return (
      <tr className="editing">
        {entries(this.props.fields).map(([key, value]) => (
          <td key={key}>
            <RowInput editing placeholder={value} value={item[key] || ''} onChange={this._onChange(key)} onUpdate={this._onCreate}/>
          </td>
        ))}
        <td className="action">
          <Button onClick={this._onCreate}>
            {this.state.loading ? <Spinner/> : <Icon type="floppy-o"/>}
          </Button>
        </td>
        <td className="action">
          {
            this.state.editing
            ? <Button onClick={this._stopEditing}><Icon type="times"/></Button>
            : null
          }
        </td>
      </tr>
    )
  }

  _startEditing = () => {
    this.setState({
      item: {},
      editing: true,
    }, () => {
      ReactDOM.findDOMNode(this).querySelector('input').focus()
    })
  }

  _stopEditing = () => {
    this.setState({ editing: false })
  }

  _onChange = (fieldName: string) => (fieldValue: *) => {
    this.setState({
      item: {
        ...this.state.item,
        [fieldName]: fieldValue,
      },
    })
  }

  _onCreate = () => {
    this.setState({ loading: true }, () => {
      this.props.createItem(this.state.item).then(() => {
        this.setState({ loading: false, editing: false })
      })
    })
  }
}

/**
 * Table is a component displaying a collection of Rows
 * with a cute header and a DraftRow to insert new data.
 */
export class Table extends React.Component<*, TableProps, *> {
  render() {
    if (this.props.loading) {
      return <Spinner/>
    }

    return (
      <table style={{marginBottom: '3em'}} className="table">
        <thead>
          <tr>
            {Object.entries(this.props.fields).map(([key, value]) => (
              <th key={key}>{value}</th>
            ))}

            <th/>
            <th/>
          </tr>
        </thead>

        <tbody>
          {this.props.items.map((x, i) => (
            <Row key={i} item={x} fields={this.props.fields}
                 updateItem={this.props.updateItem}
                 deleteItem={this.props.deleteItem}/>
          ))}

          <DraftRow fields={this.props.fields} createItem={this.props.createItem}/>
        </tbody>
      </table>
    )
  }
}
