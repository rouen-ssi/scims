/** @flow */
import React from 'react'

import { Editor, EditorState, convertFromRaw } from 'draft-js'
import type { RawDraftContentState } from 'draft-js'

import { blockRenderMap, blockStyleFn } from './DraftScreen/ContentInput/blockRenderMap'

type Props = {
  content: RawDraftContentState,
}

export function ArticleContent(props: Props) {
  const content = convertFromRaw(props.content)
  const editorState = EditorState.createWithContent(content)

  return (
    <div className="editor readonly">
      <Editor
        editorState={editorState}
        readOnly={true}
        blockRenderMap={blockRenderMap}
        blockStyleFn={blockStyleFn}
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
