/** @flow */

import type { Action } from '../../actions/admin/account'
import type { User } from '../../services/account'

export type State = {
  loading: boolean,
  loadError: ?Error,
  accounts: Array<User>,
}

const initialState: State = {
  loading: false,
  loadError: null,
  accounts: [],
}

export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case '@ADMIN/ACCOUNT/LOAD_ALL':
      return {
        ...state,

        loading: false,
        loadError: null,
        accounts: action.accounts,
      }

    case '@ADMIN/ACCOUNT/LOADING':
      return {
        ...state,

        loading: true,
      }

    case '@ADMIN/ACCOUNT/LOAD_ERROR':
      return {
        ...state,

        loading: false,
        loadError: action.error,
      }

    default:
      return state
  }
}
