/** @flow */

import React from 'react'
import cx from 'classnames'
import { Map as ImmutableMap } from 'immutable'

import { Editor, EditorState, RichUtils, DefaultDraftBlockRenderMap, Entity } from 'draft-js'
import { Icon } from '../icons/FontAwesome'
import { Icon as TexIcon } from '../icons/Tex'
import { Modal } from '../Modal'

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
      <a key={i} href="#" onClick={x.props.onClick || this.onClick(x.props.command, !!x.props.commandInline)} className={cx({active: currentInlineStyles.has(x.props.command) || currentBlock.getType() === x.props.command, disabled: !x.props.onClick && !x.props.command})}>
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

export const EditorToolbar = (props: {editorState: EditorState, onNewLink: () => void, onNewTexBlock: () => void, onClick: (command: string, commandInline: boolean) => void}) => (
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
    <TexIcon width={30} height={12} command="tex-block" onClick={wrapClickEvent(props.onNewTexBlock)}/>
    <Icon type="link" onClick={wrapClickEvent(props.onNewLink)} command="link" commandInline/>
    <Icon type="table"/>
    <Icon type="list-ul" command="unordered-list-item"/>
    <Icon type="list-ol" command="ordered-list-item"/>
  </Toolbar>
)

function wrapClickEvent(fun: () => void): (event: Event) => false {
  return e => {
    e.preventDefault()
    fun()
    return false
  }
}

class NewLinkModal extends React.Component {
  props: {
    active: boolean,
    onClose: () => void,
    onSubmit: (url: string) => void,
  }

  state = {
    url: '',
  }

  refs: {
    input: HTMLInputElement,
  }

  render() {
    return (
      <Modal active={this.props.active} title="New Link" onClose={this.props.onClose}>
        <p>Please enter link's URL :</p>
        <input ref="input" type="text" value={this.state.url} placeholder={document.location.origin} onKeyDown={this._onKeyDown} onChange={this._onChange}/>
      </Modal>
    )
  }

  componentDidUpdate() {
    if (this.props.active) {
      this.refs.input.focus()
    }
  }

  _onKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      this.props.onSubmit(this.state.url)
      this.setState({ url: '' })
      return false
    }
  }

  _onChange = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      this.setState({
        url: e.target.value,
      })
    }
  }
}

class NewTexBlockModal extends React.Component {
  props: {
    active: boolean,
    onClose: () => void,
    onSubmit: (expression: string) => void,
  }

  state = {
    expression: '',
  }

  render() {
    return (
      <Modal active={this.props.active} onClose={this.props.onClose} title="New TeX Expression">
        <input ref="input" type="text" value={this.state.expression} placeholder="y = ax + b" onKeyDown={this._onKeyDown} onChange={this._onChange}/>
      </Modal>
    )
  }

  componentDidUpdate() {
    if (this.props.active) {
      this.refs.input.focus()
    }
  }

  _onKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      this.props.onSubmit(this.state.expression)
      this.setState({ expression: '' })
      return false
    }
  }

  _onChange = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      this.setState({
        expression: e.target.value,
      })
    }
  }
}

export class ContentInput extends React.Component {
  props: {
    value: EditorState,
    placeholder: string,
    onChange: (_: EditorState, callback?: () => void) => void,
  }

  state = {
    newLink: false,
    newTexBlock: false,
  }

  refs: {
    editor: Editor,
  }

  render() {
    return (
      <div className="content-input">
        <NewLinkModal
          active={this.state.newLink}
          onClose={() => this.setState({ newLink: false })}
          onSubmit={this._onNewLink}
        />

        <NewTexBlockModal
          active={this.state.newTexBlock}
          onClose={() => this.setState({ newTexBlock: false })}
          onSubmit={this._onNewTexBlock}
        />

        <EditorToolbar
          editorState={this.props.value}
          onClick={this._onToolbar}
          onNewLink={() => this.setState({ newLink: true })}
          onNewTextBlock={() => this.setState({ newTexBlock: true })}
        />

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

  _onNewLink = (url: string) => {
    const value = this.props.value

    const entityKey = Entity.create('LINK', 'MUTABLE', {url})
    const newValue =
      EditorState.forceSelection(
        RichUtils.toggleLink(value, value.getSelection(), entityKey),
        value.getSelection(),
      )

    this._onChange(newValue, () => {
      this.setState({ newLink: false }, () => {
        this.refs.editor.focus()
      })
    })
  }

  _onNewTexBlock = (expression: string) => {

  }
}
