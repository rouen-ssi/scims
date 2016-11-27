/** @flow */

import React from 'react'
import cx from 'classnames'

import { Editor, EditorState, RichUtils } from 'draft-js'
import { Icon } from '../icons/FontAwesome'

class Toolbar extends React.Component {
  props: {
    children?: React$Element<*>[],
    editorState: EditorState,
    onClick: (command: string, commandInline: boolean) => void,
  }

  render() {
    const currentInlineStyles = this.props.editorState.getCurrentInlineStyle()

    if (!this.props.children) {
      throw new Error('smth went wrong')
    }

    const children = this.props.children.map((x, i) => (
      <a key={i} href="#" onClick={this.onClick(x.props.command, !!x.props.commandInline)} className={cx({active: currentInlineStyles.has(x.props.command), disabled: !x.props.command})}>
        {x}
      </a>
    ))

    return (
      <ul className="toolbar">
        {children}
      </ul>
    )
  }

  onClick(command?: string, commandInline: boolean): (_: Event) => boolean {
    return (e) => {
      e.preventDefault()

      if (command) {
        this.props.onClick(command, commandInline)
      }

      return false
    }
  }
}

function IconCompound({ text, ...props }) {
  return <span className="compound"><Icon {...props}/><span>{text}</span></span>
}

export const EditorToolbar = (props: {editorState: EditorState, onClick: (command: string, commandInline: boolean) => void}) => (
  <Toolbar {...props}>
    {/* typo */}
    <Icon type="font"/>
    <Icon type="text-height"/>
    <Icon type="bold" command="BOLD" commandInline/>
    <Icon type="italic" command="ITALIC" commandInline/>
    <Icon type="underline" command="UNDERLINE" commandInline/>
    <Icon type="strikethrough" command="STRIKETROUGH" commandInline/>

    {/* titles */}
    <IconCompound command="header-one" type="header" text="1"/>
    <IconCompound command="header-two" type="header" text="2"/>
    <IconCompound command="header-three" type="header" text="3"/>

    {/* align */}
    <Icon type="align-center"/>
    <Icon type="align-justify"/>
    <Icon type="align-left"/>
    <Icon type="align-right"/>

    {/* components */}
    <Icon type="link"/>
    <Icon type="table"/>
    <Icon type="list-ul" command="unordered-list-item"/>
    <Icon type="list-ol" command="ordered-list-item"/>
  </Toolbar>
)

export class ContentInput extends React.Component {
  props: {
    value: EditorState,
    placeholder: string,
    onChange: (_: EditorState) => void,
  }

  state = {
    value: this.props.value,
  }

  refs: {
    editor: Editor,
  }

  render() {
    return (
      <div className="content-input">
        <EditorToolbar editorState={this.state.value} onClick={this._onToolbar}/>

        <Editor
          ref="editor"
          editorState={this.state.value}
          onChange={this._onChange}
          customStyleMap={{
            'STRIKETROUGH': { textDecoration: 'line-through' },
          }}
        />
      </div>
    )
  }

  _onChange = (value: EditorState) => {
    console.log(value.getSelection().serialize())
    this.setState({ value })
  }

  _onToolbar = (command: string, commandInline: boolean) => {
    const value = commandInline
      ? RichUtils.toggleInlineStyle(this.state.value, command)
      : RichUtils.toggleBlockType(this.state.value, command)

    this.setState({ value }, () => {
      this.refs.editor.focus()
    })
  }
}
