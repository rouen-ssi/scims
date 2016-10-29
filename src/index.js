import React from 'react'
import ReactDOM from 'react-dom'

import { Provider as ReduxProvider } from 'react-redux'
import { configureStore } from './configureStore'

import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Article from './components/Article'

import './scss/scims.scss'

class App extends React.Component {
  state = {
    store: configureStore(),
  }

  render() {
    return (
      <ReduxProvider store={this.state.store}>
        <div>
          <Header />
          <div className="page-wrap">
            <Sidebar />
            <div className='bloc content-wrap'>
              <Article />
              <Article />
            </div>
          </div>
        </div>
      </ReduxProvider>
    )
  }
}

const root = document.createElement('div')
document.body.appendChild(root)

ReactDOM.render(<App />, root)
