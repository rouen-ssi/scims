import React from 'react'
import ReactDOM from 'react-dom'
import { Router, IndexRoute, hashHistory } from 'react-router'

import { Provider } from 'react-redux'
import { configureStore } from './configureStore'

import App from './components/App'
import Home from './components/Home'
import Signup from './components/Signup'
import Signin from './components/Signin'

import './scss/scims.scss'

let store = configureStore()

const root = document.createElement('div')
document.body.appendChild(root)

ReactDOM.render((
  <Provider store={store}>
    <Router history={ hashHistory }>
      <Router path='/' component={App}>
        <IndexRoute component={Home} />
        <Router path='/signup' component={Signup} />
        <Router path='/signin' component={Signin} />
      </Router>
    </Router>
  </Provider>
), root)
