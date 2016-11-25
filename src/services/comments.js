/** @flow */

import { JsonService } from './json'

import type { User } from './account'

export type Comment = {
  id: number,
  parent_comment_id: number,
  user: User,
  publication_date: string,
  content: string,
}

export type FetchResponse = {
  comments: Array<Comment>,
}

export class CommentService extends JsonService {
  fetch(articleId: number): Promise<FetchResponse> {
    return this.request('GET', `/article/${articleId}/comments`)
  }
}
