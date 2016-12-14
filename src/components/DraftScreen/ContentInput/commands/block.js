/** @flow */

import { RichUtils, EditorState } from 'draft-js'
import type { Command } from './index'

export type BlockType
  = 'header-one'
  | 'header-two'
  | 'header-three'
  | 'blockquote'
  | 'unordered-list-item'
  | 'ordered-list-item'

export function block(blockType: BlockType): Command {
  return {
    apply: (editorState) => {
      const selection = editorState.getSelection()
      const newState = RichUtils.toggleBlockType(editorState, blockType)
      return EditorState.forceSelection(newState, selection)
    },

    isActive: (editorState) => {
      const selection = editorState.getSelection()
      const content = editorState.getCurrentContent()
      const block = content.getBlockForKey(selection.getStartKey())

      if (!block) {
        return false
      }

      return block.getType() === blockType
    },
  }
}
