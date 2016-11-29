/** @flow */

import React from 'react'

import Textarea from 'react-textarea-autosize'

export class ContentInput extends React.Component {
  props: {
    value: string,
    placeholder: string,
    onChange: (value: string) => void,
  }

  render() {
    return (
      <Textarea
        value={this.props.value}
        placeholder={this.props.placeholder}
        onChange={this._onChange}
      />
    )
  }

  _onChange = (e: Event) => {
    e.preventDefault()

    if (e.target instanceof HTMLTextAreaElement) {
      this.props.onChange(e.target.value)
    }

    return false
  }
}
