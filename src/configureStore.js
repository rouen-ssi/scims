import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import * as reducers from './reducers'

export function configureStore() {
  return createStore(
    combineReducers(reducers),
    applyMiddleware(thunk)
  )
}
