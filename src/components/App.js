/** @flow */
import React from 'react'

import Header from '../containers/Header'
import Footer from './Footer'

export const App = (props: {children: React$Element<*>}) => (
  <div>
    <Header />

    <div className="page-wrap">
      {props.children}
    </div>

    <Footer />
  </div>
)
