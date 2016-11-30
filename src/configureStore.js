import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import * as reducers from './reducers'

export function configureStore() {
  const logger = createLogger()
  return createStore(
    combineReducers(reducers),
    applyMiddleware(thunk, logger),
  )
}
