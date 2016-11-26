/** @flow */

import React from 'react'

import { Editor, EditorState } from 'draft-js'

export class ContentInput extends React.Component {
  props: {
    value: EditorState,
    onChange: (_: EditorState) => void,
  }

  render() {
    return (
      <Editor
        editorState={this.props.value}
        onChange={this.props.onChange}/>
    )
  }
}
