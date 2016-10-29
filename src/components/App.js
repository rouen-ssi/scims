import React from 'react'
import Header from './Header'

const App = ({children}) => (
  <div>
    <Header />
    <div className="page-wrap">
      {children}
    </div>
  </div>
)

App.propTypes = {
  children: React.PropTypes.element,
}

export default App
