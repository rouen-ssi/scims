import React from 'react'
import ReactDOM from 'react-dom'

import './index.scss'

class HelloWorld extends React.Component {
  render() {
    return <h1>Hello, World!</h1>
  }
}

const root = document.createElement('div')
document.body.appendChild(root)

ReactDOM.render(<HelloWorld />, root)
