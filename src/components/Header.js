import React from 'react'
import { Link } from 'react-router'

const Header = () => (
  <header className='header'>
    <div className='header-wrap'>
      <h1 className='logo'>SciMS</h1>
      <nav className='nav'>
        <ul>
          <li><Link to='/'>HOME</Link></li>
          <li><a href='#'>CATEGORIES</a></li>
          <li><a href='#'>ARCHIVES</a></li>
          <li><Link to="/signup">SIGN UP</Link></li>
          <li><Link to="/signin">SIGN IN</Link></li>
        </ul>
      </nav>
      <div className='clear-float'></div>
    </div>
  </header>
)

export default Header
