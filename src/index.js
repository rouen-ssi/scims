import React from 'react'
import ReactDOM from 'react-dom'

import './index.scss'

class HelloWorld extends React.Component {
  render() {
    return <h1>Hello, World!</h1>
  }
}

ReactDOM.render(
  <HelloWorld />,
  document.body
)
