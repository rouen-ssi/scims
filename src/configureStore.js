import { compose, createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import persistState from 'redux-localstorage'

import * as reducers from './reducers'

export function configureStore() {
  const logger = createLogger()
  return createStore(
    combineReducers(reducers),
    compose(
      applyMiddleware(thunk, logger),
      persistState('account', {
        key: '@@SCIMS/1.0',
      })
    )
  )
}
