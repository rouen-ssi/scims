/** @flow **/

import * as Immutable from 'immutable'

import type { Comment } from '../services/comments'
import type { Action } from '../actions/comment'

type ArticleId = number

export type State = {
  loading: boolean,
  lastError: ?Error,

  comments: Immutable.Map<ArticleId, Array<Comment>>,
}

const initialState: State = {
  loading: false,
  lastError: null,

  comments: new Immutable.Map(),
  pagination: {
    current: 1,
    count: 1,
  },
}

export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case '@COMMENTS/LOADING':
      return {
        ...state,
        loading: true,
      }

    case '@COMMENTS/LOAD_ERROR':
      return {
        ...state,
        loading: false,
        lastError: action.error,
      }

    case '@COMMENTS/LOAD':
      return {
        ...state,
        loading: false,
        lastError: null,

        comments: state.comments.set(action.articleId, action.comments),
      }

    default:
      return state
  }
}
