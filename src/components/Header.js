import React from 'react'

class Header extends React.Component {

  render() {
    return (
      <header className='header'>
        <div className='header-wrap'>
          <h1 className="logo">SciMS</h1>
          <nav className="nav">
            <ul>
              <li><a href="#">HOME</a></li>
              <li><a href="#">CATEGORIES</a></li>
              <li><a href="#">ARCHIVES</a></li>
              <li><a href="#">SIGN UP</a></li>
              <li><a href="#">SIGN IN</a></li>
            </ul>
          </nav>
          <div className='clear-float'></div>
        </div>
      </header>
    )
  }

}

export default Header
