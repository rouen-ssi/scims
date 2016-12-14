/** @flow */

import React from 'react'
import cx from 'classnames'
import { wrapPreventDefault } from '../utils'

import { Icon } from './icons/FontAwesome'

export type Props = {
  active: boolean,
  title: string,
  buttons?: React$Element<*>[],
  children?: React$Element<*>,

  onClose?: () => void,
  onConfirm?: () => void,
}

export function Button({children, ...props}: {children?: any}) {
  return <button {...props}>{children}</button>
}

export class Modal extends React.Component {
  props: Props;

  state = {
    active: this.props.active,
  }

  close() {
    if (this.props.onClose) {
      this.props.onClose()
    } else {
      this.setState({ active: false })
    }
  }

  componentWillReceiveProps({ active }: Props) {
    this.setState({ active })
  }

  componentDidMount() {
    document.addEventListener('keydown', this._onKeydown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._onKeydown)
  }

  _onKeydown = (e: KeyboardEvent) => {
    if (this.state.active && e.keyCode === 27) {
      this.close()
    }
  }

  render() {
    const defaultButtons = [
      <Button key="confirm" className="confirm" onClick={wrapPreventDefault(this.props.onConfirm)}>Confirm</Button>,
      <Button key="cancel" className="cancel" onClick={wrapPreventDefault(() => this.close())}>Cancel</Button>,
    ]

    const { title, children, buttons = defaultButtons } = this.props

    return (
      <div className={cx('modal', { active: this.state.active })}>
        <div className="modal-title">
          <span>{title}</span>
          <a href="#" onClick={wrapPreventDefault(() => this.close())}><Icon type="close"/></a>
        </div>

        <div className="modal-body">
          {children}
        </div>

        <div className="modal-buttons">
          {buttons}
        </div>
      </div>
    )
  }
}
