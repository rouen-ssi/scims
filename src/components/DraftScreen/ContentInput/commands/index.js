/** @flow */

import { OrderedSet } from 'immutable'
import type { EditorState } from 'draft-js'

export type Command = {
  apply: (editorState: EditorState) => EditorState | Promise<EditorState>,
  isActive: (editorState: EditorState) => boolean,
}

export function getCurrentInlineStyles(editorState: EditorState): OrderedSet<string> {
  const content = editorState.getCurrentContent()
  const selection = editorState.getSelection()
  const block = content.getBlockForKey(selection.getStartKey())
  if (!block) {
    return new OrderedSet()
  }
  return block.getInlineStyleAt(selection.getStartOffset())
}
