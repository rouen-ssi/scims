import React from 'react'
import ReactDOM from 'react-dom'
import { hashHistory, browserHistory } from 'react-router'

import { Provider } from 'react-redux'
import { configureStore } from './configureStore'
import { configureRouter } from './routes'

import * as accountActions from './actions/account'

let root = document.getElementById('scims-app')
let history
if (!root) {
  root = document.createElement('div')
  root.id = 'scims-app'
  document.body.appendChild(root)
  history = hashHistory
} else {
  history = browserHistory
}

const store = configureStore()
const router = configureRouter(history, store)
ReactDOM.render(<Provider store={store}>{router}</Provider>, root)

store.dispatch(accountActions.fetchProfile())
