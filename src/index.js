import React from 'react'
import ReactDOM from 'react-dom'

import { Provider as ReduxProvider } from 'react-redux'
import { configureStore } from './configureStore'

import './index.scss'

class App extends React.Component {
  state = {
    store: configureStore(),
  }

  render() {
    return (
      <ReduxProvider store={this.state.store}>
        <h1>Hello, World!</h1>
      </ReduxProvider>
    )
  }
}

const root = document.createElement('div')
document.body.appendChild(root)

ReactDOM.render(<App />, root)
