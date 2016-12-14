/** @flow */

import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import { maybeArray } from './utils'

import { App } from './components/App'

import RegisterScreen from './containers/RegisterScreen'
import Signin from './containers/Signin'
import Signout from './containers/Signout'
import CategoryScreen from './containers/CategoryScreen'
import ArticleScreen from './containers/ArticleScreen'
import DraftScreen from './containers/DraftScreen'
import AdminAccountScreen from './containers/admin/AccountScreen'
import AdminCategoryScreen from './containers/admin/CategoryScreen'

import * as accountActions from './actions/account'
import * as articleActions from './actions/article'
import * as categoryActions from './actions/category'
import * as commentActions from './actions/comment'
import * as adminAccountActions from './actions/admin/account'

import type { State } from './reducers'
import type { Action } from './actions'

export function configureRouter<H>(history: H, store: Store<State, Action>): React$Element<*> {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={CategoryScreen}
                    onEnter={onEnter(store, () => ([
                      categoryActions.fetchAll(),
                      articleActions.fetchPage(1),
                    ]))}/>

        <Route path="register/:token" component={RegisterScreen}
               onEnter={onEnter(store, ({token}) => ([
                 accountActions.fetchProfile(token),
               ]))}/>
        <Route path="signin" component={Signin}/>
        <Route path="signout" component={Signout}/>

        <Route path="category/:categoryId/:categorySlug" component={CategoryScreen}
               onEnter={onEnter(store, ({categoryId}) => ([
                 categoryActions.fetchAll(),
                 categoryActions.fetchCategory(parseInt(categoryId, 10)),
                 articleActions.fetchPage(1, parseInt(categoryId, 10)),
               ]))}/>

        <Route path="article/:articleId/:articleSlug" component={ArticleScreen}
               onEnter={onEnter(store, ({articleId}) => ([
                 articleActions.fetchOne(parseInt(articleId, 10)),
                 commentActions.fetch(parseInt(articleId, 10)),
               ]))}/>

        <Route path="draft" component={DraftScreen}
               onEnter={onEnter(store, () => articleActions.unloadDraft())}/>

        <Route path="draft/:draftId" component={DraftScreen}
               onEnter={onEnter(store, ({draftId}) => articleActions.fetchDraft(parseInt(draftId, 10)))}/>

        <Route path="admin">
          <Route path="accounts" component={AdminAccountScreen}
                 onEnter={onEnter(store, () => [
                   adminAccountActions.fetchAll(),
                 ])}/>
          <Route path="categories" component={AdminCategoryScreen}
                 onEnter={onEnter(store, () => [
                   categoryActions.fetchAll(),
                 ])}/>
        </Route>
      </Route>
    </Router>
  )
}

// RouterState contains information about the current route
type RouterState = { params: Object }
// RedirectFunction is useful to make the user go to another route
type RedirectFunction = (state: ?Object, pathname: string, query: ?Object) => void

/**
 * This function abstracts away grunt work when you want to dispatch some actions
 * before displaying the route's component.
 * You can dispatch asynchronous actions but they better be fast
 * as it will hang the screen during the time this router wait for promises to complete.
 */
function onEnter(store: Store<State, Action>, computeActions: (_: Object) => Array<Action>|Action) {
  return (nextState: RouterState, replace: RedirectFunction, callback: () => void) => {
    const promises: Array<Promise<*>> = []

    for (const action of maybeArray(computeActions(nextState.params))) {
      const resp = store.dispatch(action)

      if (resp instanceof Promise) {
        promises.push(resp)
      }
    }

    if (promises.length > 0) {
      Promise.all(promises).then(() => callback())
    } else {
      callback()
    }
  }
}
