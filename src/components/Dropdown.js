/** @flow */

import React from 'react'

export type Props = {
  open: boolean,
  children?: React$Element<*>,
  onClose: () => void,
}

export class Dropdown extends React.Component {
  props: Props;

  refs: {
    dropdown: ?HTMLDivElement,
  }

  componentDidUpdate() {
    if (this.props.open) {
      document.addEventListener('click', this._listenOuterClick)
    } else {
      document.removeEventListener('click', this._listenOuterClick)
    }
  }

  render() {
    if (this.props.open) {
      return this.renderOpen()
    } else {
      return this.renderClosed()
    }
  }

  renderOpen() {
    return <div ref="dropdown" className="dropdown" onClick={this._onClick}>{this.props.children}</div>
  }

  renderClosed() {
    return null
  }

  _onClick = () => {
    this.props.onClose()
  }

  _listenOuterClick = (e: MouseEvent) => {
    const dropdown = this.refs.dropdown

    if (!dropdown) {
      return
    }

    if (e.target instanceof Node && !dropdown.contains(e.target)) {
      this.props.onClose()
    }
  }
}
