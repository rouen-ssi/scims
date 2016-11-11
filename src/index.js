import React from 'react'
import ReactDOM from 'react-dom'
import { Router, IndexRoute, hashHistory } from 'react-router'

import { Provider } from 'react-redux'
import { configureStore } from './configureStore'

import App from './containers/App'
import Home from './containers/Home'
import Signup from './containers/Signup'
import Signin from './containers/Signin'
import Signout from './containers/Signout'

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
        <Router path='/signout' component={Signout} />
      </Router>
    </Router>
  </Provider>
), root)
