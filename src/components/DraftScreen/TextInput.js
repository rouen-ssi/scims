/** @flow */

import React from 'react'

export class TextInput extends React.Component {
  props: {
    value: string,
    placeholder: string,

    onChange?: (value: string) => void,
  }

  state = {
    value: this.props.value,
    focus: false,
  }

  refs: {
    input: HTMLInputElement,
  }

  render() {
    if (this.state.focus) {
      return <input ref="input" type="text" placeholder={this.props.placeholder} value={this.state.value} onBlur={this._onBlur} autoFocus onChange={this._onChange}/>
    }

    return <span onClick={this._onClick}>{this.props.value || this.props.placeholder}</span>
  }

  _onClick = (e: Event) => {
    e.preventDefault()

    this.setState({ focus: true }, () => {
      this.refs.input.selectionStart = this.state.value.length
    })

    return false
  }

  _onBlur = (e: Event) => {
    e.preventDefault()

    this.setState({ focus: false })

    if (this.props.onChange) {
      this.props.onChange(this.state.value)
    }

    return false
  }

  _onChange = (e: Event) => {
    e.preventDefault()

    if (e.target instanceof HTMLInputElement) {
      this.setState({ value: e.target.value })
    }

    return false
  }
}
