/** @flow */

import React from 'react'

import { Editor, EditorState, RichUtils } from 'draft-js'
import { Icon } from '../icons/FontAwesome'

class Toolbar extends React.Component {
  props: {
    children?: React$Element<*>[],
    onClick: (type: string) => void,
  }

  render() {
    if (!this.props.children) {
      throw new Error('smth went wrong')
    }

    const children = this.props.children.map((x, i) => (
      <a key={i} href="#" onClick={this.onClick(x)}>
        {x}
      </a>
    ))

    return (
      <ul className="toolbar">
        {children}
      </ul>
    )
  }

  onClick({ props: { type } }): (_: Event) => boolean {
    return (e) => {
      e.preventDefault()

      this.props.onClick(type)

      return false
    }
  }
}

export const EditorToolbar = (props) => (
  <Toolbar {...props}>
    {/* typo */}
    <Icon type="font"/>
    <Icon type="text-height"/>
    <Icon type="bold"/>
    <Icon type="italic"/>
    <Icon type="underline"/>
    <Icon type="strikethrough"/>

    {/* titles */}
    <span type="h1" className="compound"><Icon type="header"/><span>1</span></span>
    <span type="h2" className="compound"><Icon type="header"/><span>2</span></span>
    <span type="h3" className="compound"><Icon type="header"/><span>3</span></span>

    {/* align */}
    <Icon type="align-center"/>
    <Icon type="align-justify"/>
    <Icon type="align-left"/>
    <Icon type="align-right"/>

    {/* components */}
    <Icon type="link"/>
    <Icon type="table"/>
    <Icon type="list-ul"/>
    <Icon type="list-ol"/>
  </Toolbar>
)

export class ContentInput extends React.Component {
  props: {
    value: EditorState,
    placeholder: string,
    onChange: (_: EditorState) => void,
  }

  refs: {
    editor: Editor,
  }

  render() {
    return (
      <div className="content-input">
        <EditorToolbar onClick={this._onToolbar}/>

        <Editor
          ref="editor"
          editorState={this.props.value}
          placeholder={this.props.placeholder}
          onChange={this.props.onChange}/>
      </div>
    )
  }

  _onToolbar = (type: string) => {
    this.props.onChange(RichUtils.toggleInlineStyle(this.props.value, 'BOLD'))
    this.refs.editor.focus()
  }
}
