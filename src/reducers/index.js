/** @flow */
export { default as account } from './account'
export { default as categories } from './categories'
export { default as articles } from './articles'
export { default as comments } from './comments'

import type { State as AccountState } from './account'
import type { State as CategoryState } from './categories'
import type { State as ArticleState } from './articles'
import type { State as CommentState } from './comments'
import type { State as AdminState } from './admin'

export type State = {
  account: AccountState,
  categories: CategoryState,
  articles: ArticleState,
  comments: CommentState,
  admin: AdminState,
}
