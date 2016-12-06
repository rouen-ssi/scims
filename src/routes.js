/** @flow */

import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import { App } from './components/App'

import Signup from './containers/Signup'
import Signin from './containers/Signin'
import Signout from './containers/Signout'
import CategoryScreen from './containers/CategoryScreen'
import ArticleScreen from './containers/ArticleScreen'
import DraftScreen from './containers/DraftScreen'

export function configureRouter(history: any): React$Element<*> {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={CategoryScreen}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <Route path="/signout" component={Signout}/>
        <Route path="/category/:categoryId/:categorySlug" component={CategoryScreen}/>
        <Route path="/article/:articleId/:articleSlug" component={ArticleScreen}/>
        <Route path="/draft" component={DraftScreen}/>
        <Route path="/draft/:draftId" component={DraftScreen}/>
      </Route>
    </Router>
  )
}
