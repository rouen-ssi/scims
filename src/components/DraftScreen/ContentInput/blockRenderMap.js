/** @flow */

import { DefaultDraftBlockRenderMap } from 'draft-js'
import type { Block } from 'draft-js'

export const blockRenderMap = DefaultDraftBlockRenderMap.merge({
  'align-center': {
    element: 'div',
  },
  'align-justify': {
    element: 'div',
  },
  'align-left': {
    element: 'div',
  },
  'align-right': {
    element: 'div',
  },
})

export function blockStyleFn(block: Block): ?string {
  switch (block.getType()) {
    case 'align-center':
      return 'align-center'
    case 'align-justify':
      return 'align-justify'
    case 'align-left':
      return 'align-left'
    case 'align-right':
      return 'align-right'
  }
}
