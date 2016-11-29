/** @flow */

import React from 'react'

export type Props = {
  open: boolean,
  children?: React$Element<*>,
  onClose: () => void,
}

export class Dropdown extends React.Component {
  props: Props;

  render() {
    if (this.props.open) {
      return this.renderOpen()
    } else {
      return this.renderClosed()
    }
  }

  renderOpen() {
    return <div className="dropdown" onClick={this._onClick}>{this.props.children}</div>
  }

  renderClosed() {
    return null
  }

  _onClick = () => {
    this.props.onClose()
  }
}
