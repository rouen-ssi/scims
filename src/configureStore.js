import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import * as reducers from './reducers'
import * as adminReducers from './reducers/admin'

export function configureStore() {
  const middlewares = [thunk]
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger())
  }

  return createStore(
    combineReducers({
      ...reducers,
      admin: combineReducers(adminReducers),
    }),
    applyMiddleware(...middlewares),
  )
}
