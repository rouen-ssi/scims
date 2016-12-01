/** @flow */

import fetch from 'node-fetch'

global.API_URL = 'http://localhost:3000'
global.window = {
  localStorage: {},
  fetch,
}

import fs from 'fs'
import path from 'path'
import express from 'express'
import { lookup as lookupMime } from 'mime-types'
import React from 'react'
import { Provider } from 'react-redux'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import { renderToString } from 'react-dom/server'

import { configureStore } from './src/configureStore'
import { configureRouter } from './src/routes'
import * as articleActions from './src/actions/article'

const PORT = 8080
const app = express()

const bundles = fs.readdirSync('build')
let indexHtml
for (const bundle of bundles) {
  const bundleMime = lookupMime(bundle)
  const bundleData = fs.readFileSync(path.join('build', bundle), { flag: 'r' })

  if (bundleMime === 'text/html') {
    indexHtml = bundleData.toString('UTF-8')
  } else {
    app.get(`/${bundle}`, (req, res) => {
      console.log(`${req.method} ${req.url}`)

      res.set('Content-Type', bundleMime)
      res.send(bundleData)
    })
  }
}

app.all('*', (req, res) => {
  const store = configureStore()
  const routes = configureRouter(createMemoryHistory())

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.send(error)
      return
    }

    if (redirectLocation) {
      res.redirect(redirectLocation)
      return
    }

    console.log(`${req.method} ${req.url}`)

    articleActions.fetchOne(66)(store.dispatch, store.getState).then(() => {
      const html = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps}/>
        </Provider>
      )
      res.set('Content-Type', 'text/html')
      res.send(indexHtml.replace('<body>', '<body><div id="scims-app">' + html + '</div>'))
    })
  })
})

app.listen(PORT, () => {
  console.log('listening on', PORT)
})
