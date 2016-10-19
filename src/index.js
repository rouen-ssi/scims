import React from 'react';
import ReactDOM from 'react-dom';

import './scss/scims.scss';

class HelloWorld extends React.Component {
  render() {
    return (
      <header>
        <i className="fa fa-search"></i>
        <h1>Hello, World!</h1>
      </header>
    )
  }
}

const root = document.createElement('div')
document.body.appendChild(root)

ReactDOM.render(<HelloWorld />, root)
