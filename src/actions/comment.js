/** @flow */

import { CommentService } from '../services/comments'

import type { State } from '../reducers'
import type { Comment } from '../services/comments'

export type Action
  = { type: '@COMMENTS/LOADING' }
  | { type: '@COMMENTS/LOAD_ERROR', error: Error }
  | { type: '@COMMENTS/LOAD', articleId: number, comments: Array<Comment> }

export function loading(): Action {
  return { type: '@COMMENTS/LOADING' }
}

export function loadError(error: Error): Action {
  return { type: '@COMMENTS/LOAD_ERROR', error }
}

export function load(articleId: number, comments: Array<Comment>): Action {
  return { type: '@COMMENTS/LOAD', articleId, comments }
}

export function fetch(articleId: number): Thunk<State, Action> {
  const comments = new CommentService(API_URL)

  return async function(dispatch) {
    dispatch(loading())

    try {
      const resp = await comments.fetch(articleId)
      dispatch(load(articleId, resp.comments))
    } catch (err) {
      dispatch(loadError(err))
    }
  }
}
