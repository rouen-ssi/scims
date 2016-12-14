/** @flow */

export { default as account } from './account'

import type { State as AccountState } from './account'

export type State = {
  account: AccountState,
}
