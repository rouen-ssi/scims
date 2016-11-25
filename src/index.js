import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import { Provider } from 'react-redux'
import { configureStore } from './configureStore'

import App from './containers/App'
import Home from './containers/Home'
import Signup from './containers/Signup'
import Signin from './containers/Signin'
import Signout from './containers/Signout'
import ArticleCategory from './containers/ArticleCategory'
import ArticleScreen from './containers/ArticleScreen'

import './scss/scims.scss'

let store = configureStore()

const root = document.createElement('div')
document.body.appendChild(root)

ReactDOM.render((
  <Provider store={store}>
    <Router history={ hashHistory }>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <Route path="/signout" component={Signout}/>
        <Route path="/category/:categoryId/:categorySlug" component={ArticleCategory}/>
        <Route path="/article/:articleId/:articleSlug" component={ArticleScreen}/>
      </Route>
    </Router>
  </Provider>
), root)
