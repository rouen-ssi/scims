/** @flow */
export { default as account } from './account'
export { default as categories } from './categories'
export { default as articles } from './articles'

import type { State as AccountState } from './account'
import type { State as CategoryState } from './categories'
import type { State as ArticleState } from './articles'

export type State = {
  account: AccountState,
  categories: CategoryState,
  articles: ArticleState,
}
