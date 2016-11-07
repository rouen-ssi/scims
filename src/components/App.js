import React from 'react'
import Header from './Header'
import Footer from './Footer'

const App = ({children}) => (
  <div>
    <Header />

    <div className="page-wrap">
      {children}
    </div>

    <Footer />
  </div>
)

App.propTypes = {
  children: React.PropTypes.element,
}

export default App
