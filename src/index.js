import React from 'react'
import ReactDOM from 'react-dom'
import { Router, IndexRoute, hashHistory } from 'react-router'

import { Provider as ReduxProvider } from 'react-redux'
import { configureStore } from './configureStore'

import Home from './components/Home'
import Signup from './components/Signup'
import Header from './components/Header'

import './scss/scims.scss'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      store: configureStore(),
    }
  }

  render() {
    return (
      <ReduxProvider store={this.state.store}>
        <div>
          <Header />
          <div className="page-wrap">
            {this.props.children}
          </div>
        </div>
      </ReduxProvider>
    )
  }
}

const root = document.createElement('div')
document.body.appendChild(root)

ReactDOM.render((
  <Router history={ hashHistory }>
    <Router path='/' component={App}>
      <IndexRoute component={Home} />
      <Router path='/signup' component={Signup} />
    </Router>
  </Router>
), root)
