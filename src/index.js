import React from 'react'
import ReactDOM from 'react-dom'
import { hashHistory, browserHistory } from 'react-router'
import { Map } from 'immutable'

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

const store = configureStore(getInitialState())
const router = configureRouter(history, store)
ReactDOM.render(<Provider store={store}>{router}</Provider>, root)

store.dispatch(accountActions.fetchProfile())

function getInitialState() {
  const state = window.INITIAL_STATE
  delete window.INITIAL_STATE

  if (!state) {
    return undefined
  }

  state.articles.drafts = new Map(state.articles.drafts).mapKeys(x => parseInt(x, 10))
  state.articles.articlesById = new Map(state.articles.articlesById).mapKeys(x => parseInt(x, 10))
  state.articles.articlesByPage = new Map(state.articles.articlesByPage).mapKeys(x => parseInt(x, 10))
  state.categories.categories = new Map(state.categories.categories).mapKeys(x => parseInt(x, 10))
  state.comments.comments = new Map(state.comments.comments).mapKeys(x => parseInt(x, 10))

  return state
}
