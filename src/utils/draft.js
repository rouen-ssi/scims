/** @flow */

import { convertToRaw, ContentState } from 'draft-js'
import type { RawDraftContentState } from 'draft-js'

export function emptyRawContent(): RawDraftContentState {
  return convertToRaw(ContentState.createFromText(''))
}
