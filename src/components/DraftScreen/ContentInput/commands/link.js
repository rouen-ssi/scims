/** @flow */

import { Entity, RichUtils } from 'draft-js'
import type { Command } from './index'

export const link: Command = {
  apply: (editorState) => {
    const selection = editorState.getSelection()
    if (selection.isCollapsed() || link.isActive(editorState)) {
      return RichUtils.toggleLink(editorState, selection, null)
    }

    const url: string = window.prompt('Enter HREF')
    const entityKey = Entity.create('LINK', 'MUTABLE', { url })
    return RichUtils.toggleLink(editorState, selection, entityKey)
  },

  isActive: (editorState) => {
    const selection = editorState.getSelection()
    const content = editorState.getCurrentContent()

    const block = content.getBlockForKey(selection.getStartKey())
    if (!block) {
      return false
    }

    const entityKey = block.getEntityAt(selection.getStartOffset())
    if (!entityKey) {
      return false
    }

    const entity = Entity.get(entityKey)
    if (entity) {
      console.log(entity.toJS())
    }
    return entity !== null
  },
}
