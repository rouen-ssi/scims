/* @flow */
import React from 'react'
import cx from 'classnames'
import { wrapPreventDefault } from '../../../utils'

import { EditorState } from 'draft-js'
import { Icon } from '../../icons/FontAwesome'
import type { IconType } from '../../icons/FontAwesome'

import type { Command as CommandType } from './commands'
import { inline } from './commands/inline'
import { block } from './commands/block'

export type ToolBarProps = {
  editorState: EditorState,
  onChange: (_: EditorState, focus?: boolean) => void,
}

class Command extends React.Component {
  static contextTypes = {
    editorState: React.PropTypes.any.isRequired,
    onChange: React.PropTypes.any.isRequired,
  }

  context: {
    editorState: EditorState,
    onChange: (_: EditorState, focus?: boolean) => void,
  }

  props: {
    icon?: IconType,
    children?: React$Element<*> | Array<React$Element<*>>,
    tooltip: string,
    command?: CommandType,
  }

  state = {
    tooltipActive: false,
  }

  render() {
    const { command } = this.props
    const active = command && command.isActive(this.context.editorState)

    return (
      <a href="#" className={cx('toolbar-command', { active, disabled: !command })} onClick={wrapPreventDefault(this._onClick)} onMouseOver={this._onMouseOver} onMouseOut={this._onMouseOut}>
        {this.props.icon ? <Icon type={this.props.icon}/> : this.props.children}
        {this.renderTooltip()}
      </a>
    )
  }

  renderTooltip() {
    if (!this.state.tooltipActive) {
      return null
    }

    return (
      <div className="tooltip">
        <span className="tooltip-text">
          {this.props.command ? this.props.tooltip : 'Coming Soon!'}
        </span>
      </div>
    )
  }

  _onClick = () => {
    const { command } = this.props
    const { onChange, editorState } = this.context

    if (!command) {
      return
    }

    const result = command.apply(editorState)

    if (result instanceof Promise) {
      result.then(x => onChange(x, true))
    } else if (result instanceof EditorState) {
      onChange(result, true)
    }
  }

  _onMouseOver = () => {
    this.setState({ tooltipActive: true })
  }

  _onMouseOut = () => {
    this.setState({ tooltipActive: false })
  }
}

const FormulaIcon = () => (
  <i className="toolbar-command-body" style={{fontFamily: 'cursive', fontWeight: 'bold'}}>
    f
  </i>
)

export class ToolBar extends React.Component<*, ToolBarProps, *> {
  static childContextTypes = {
    editorState: React.PropTypes.any.isRequired,
    onChange: React.PropTypes.any.isRequired,
  }

  getChildContext() {
    return {
      editorState: this.props.editorState,
      onChange: this.props.onChange,
    }
  }

  render() {
    return (
      <div className="toolbar">
        <Command icon="bold" tooltip="Bold" command={inline('BOLD')}/>
        <Command icon="italic" tooltip="Italic" command={inline('ITALIC')}/>
        <Command icon="underline" tooltip="Underline" command={inline('UNDERLINE')}/>
        <Command icon="strikethrough" tooltip="Strikethrough" command={inline('STRIKETHROUGH')}/>
        <Command icon="code" tooltip="Code" command={inline('CODE')}/>
        <Command icon="globe" tooltip="Link"/>
        <Command icon="list-ul" tooltip="Unordered List" command={block('unordered-list-item')}/>
        <Command icon="list-ol" tooltip="Ordered List" command={block('ordered-list-item')}/>
        <Command icon="align-left" tooltip="Align Left"/>
        <Command icon="align-right" tooltip="Align Right"/>
        <Command icon="align-center" tooltip="Center"/>
        <Command icon="align-justify" tooltip="Justify"/>
        <Command icon="header" tooltip="Header" command={block('header-two')}/>
        <Command icon="picture-o" tooltip="Picture"/>
        <Command tooltip="Formula">
          <FormulaIcon/>
        </Command>
        <Command icon="quote-right" tooltip="Quote" command={block('blockquote')}/>
        <Command icon="book" tooltip="Definition"/>
        <Command icon="chain" tooltip="Article Reference"/>
      </div>
    )
  }
}
