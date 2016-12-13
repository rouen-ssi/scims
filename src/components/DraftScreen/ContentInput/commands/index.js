/** @flow */

import type { EditorState } from 'draft-js'

export type Command = {
  apply: (editorState: EditorState) => EditorState | Promise<EditorState>,
  isActive: (editorState: EditorState) => boolean,
}
