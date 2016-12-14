/** @flow */

import React from 'react'

import Textarea from 'react-textarea-autosize'

export class TitleInput extends React.Component {
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

    /* eslint-disable no-undef */
    if (e.target instanceof HTMLTextAreaElement) {
    /* eslint-enable no-undef */
      this.props.onChange(e.target.value)
    }

    return false
  }
}
