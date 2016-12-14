/** @flow */
import React from 'react'

import { Editor, EditorState, ContentState } from 'draft-js'
import { ToolBar } from './ToolBar'

export type Props = {
  value: string | ContentState | void,
  placeholder: string,
  onChange: (value: ContentState) => void,
}

export type State = {
  editorState: EditorState,
}

function asContentState(value: string | ContentState | void): ContentState {
  if (typeof value === 'string') {
    return ContentState.createFromText(value)
  } else if (value instanceof ContentState) {
    return value
  }
  return ContentState.createFromText('')
}

const updateEditorState = EditorState.set

export class ContentInput extends React.Component<{}, Props, State> {
  static defaultProps = {}

  refs: {
    editor: Editor,
  }

  state = {
    editorState: updateEditorState(EditorState.createEmpty(), {
      currentContent: asContentState(this.props.value),
    }),
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      editorState: updateEditorState(this.state.editorState, {
        currentContent: asContentState(nextProps.value),
      }),
    })
  }

  render() {
    return (
      <div className="editor">
        <ToolBar
          editorState={this.state.editorState}
          onChange={this._onChange}
        />

        <Editor
          ref="editor"
          editorState={this.state.editorState}
          placeholder={this.props.placeholder}
          onChange={this._onChange}
          customStyleMap={{
            'STRIKETHROUGH': {
              textDecoration: 'line-through',
            },
            'CODE': {
              fontFamily: 'monospace',
            },
          }}
        />
      </div>
    )
  }

  _onChange = (editorState: EditorState, focus?: boolean) => {
    this.setState({ editorState }, () => {
      this.props.onChange(this.state.editorState.getCurrentContent())
      if (focus) {
        this.refs.editor.focus()
      }
    })
  }
}
