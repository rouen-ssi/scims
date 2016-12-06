import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import * as reducers from './reducers'

export function configureStore(initialState) {
  const logger = createLogger()
  return createStore(
    combineReducers(reducers),
    initialState,
    applyMiddleware(thunk, logger),
  )
}
