import React from 'react'
import ReactDOM from 'react-dom'
import { hashHistory } from 'react-router'

import { Provider } from 'react-redux'
import { configureStore } from './configureStore'
import { configureRouter } from './routes'

import * as accountActions from './actions/account'

const root = document.createElement('div')
document.body.appendChild(root)

const store = configureStore()
const router = configureRouter(hashHistory, store)
ReactDOM.render(<Provider store={store}>{router}</Provider>, root)

store.dispatch(accountActions.fetchProfile())
