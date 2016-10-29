import React from 'react'
import { Link } from 'react-router'

class Header extends React.Component {

  render() {
    return (
      <header className='header'>
        <div className='header-wrap'>
          <h1 className='logo'>SciMS</h1>
          <nav className='nav'>
            <ul>
              <li><Link to='/'>HOME</Link></li>
              <li><a href='#'>CATEGORIES</a></li>
              <li><a href='#'>ARCHIVES</a></li>
              <li><Link to="/signup">SIGN UP</Link></li>
              <li><a href='#'>SIGN IN</a></li>
            </ul>
          </nav>
          <div className='clear-float'></div>
        </div>
      </header>
    )
  }

}

export default Header
