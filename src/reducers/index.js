/** @flow */
export { default as account } from './account'
export { default as categories } from './categories'

import type { State as AccountState } from './account'
import type { State as CategoryState } from './categories'

export type State = {
  account: AccountState,
  categories: CategoryState,
}
