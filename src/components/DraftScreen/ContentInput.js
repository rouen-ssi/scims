/** @flow */

import React from 'react'
import cx from 'classnames'
import { Map as ImmutableMap } from 'immutable'

import { Editor, EditorState, RichUtils, DefaultDraftBlockRenderMap } from 'draft-js'
import { Icon } from '../icons/FontAwesome'

class Toolbar extends React.Component {
  props: {
    children?: React$Element<*>[],
    editorState: EditorState,
    onClick: (command: string, commandInline: boolean) => void,
  }

  render() {
    const currentInlineStyles = this.props.editorState.getCurrentInlineStyle()
    const currentBlock = this.props.editorState.getCurrentContent().getBlockForKey(this.props.editorState.getSelection().getStartKey())

    if (!this.props.children) {
      throw new Error('smth went wrong')
    }

    const children = this.props.children.map((x, i) => (
      <a key={i} href="#" onClick={this.onClick(x.props.command, !!x.props.commandInline)} className={cx({active: currentInlineStyles.has(x.props.command) || currentBlock.getType() === x.props.command, disabled: !x.props.command})}>
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
    <Icon type="align-center" command="align-center"/>
    <Icon type="align-justify" command="align-justify"/>
    <Icon type="align-left" command="align-left"/>
    <Icon type="align-right" command="align-right"/>

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
    onChange: (_: EditorState, callback?: () => void) => void,
  }

  refs: {
    editor: Editor,
  }

  render() {
    return (
      <div className="content-input">
        <EditorToolbar editorState={this.props.value} onClick={this._onToolbar}/>

        <Editor
          ref="editor"
          editorState={this.props.value}
          onChange={this._onChange}
          customStyleMap={{
            'STRIKETROUGH': { textDecoration: 'line-through' },
          }}
          blockRenderMap={DefaultDraftBlockRenderMap.merge(ImmutableMap({
            'align-center': {
              wrapper: <div className="align-center"/>,
            },
            'align-left': {
              wrapper: <div className="align-left"/>,
            },
            'align-right': {
              wrapper: <div className="align-right"/>,
            },
            'align-justify': {
              wrapper: <div className="align-justify"/>,
            },
          }))}
        />
      </div>
    )
  }

  _onChange = (value: EditorState, callback?: () => void) => {
    this.props.onChange(value, callback)
  }

  _onToolbar = (command: string, commandInline: boolean) => {
    const value = commandInline
      ? RichUtils.toggleInlineStyle(this.props.value, command)
      : RichUtils.toggleBlockType(this.props.value, command)

    this._onChange(value, () => this.refs.editor.focus())
  }
}
