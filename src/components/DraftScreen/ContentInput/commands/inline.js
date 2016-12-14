/** @flow */

import { EditorState, RichUtils } from 'draft-js'
import { getCurrentInlineStyles } from './index'
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
      const styles = getCurrentInlineStyles(editorState)
      return styles.contains(inlineStyle)
    },
  }
}
