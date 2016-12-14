/** @flow */

import { EditorState, RichUtils } from 'draft-js'
import type { Command } from './index'

export type InlineStyle = 'BOLD' | 'ITALIC' | 'UNDERLINE' | 'STRIKETHROUGH' | 'CODE'

export function inline(inlineStyle: InlineStyle): Command {
  return {
    apply: (editorState) => {
      const selection = editorState.getSelection()
      const newState = RichUtils.toggleInlineStyle(editorState, inlineStyle)
      return EditorState.forceSelection(newState, selection)
    },
    isActive: (editorState) => {
      const content = editorState.getCurrentContent()
      const selection = editorState.getSelection()
      const block = content.getBlockForKey(selection.getStartKey())
      if (!block) {
        return false
      }
      const styles = block.getInlineStyleAt(selection.getStartOffset())
      return styles.contains(inlineStyle)
    },
  }
}
