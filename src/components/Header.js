import React from 'react'

class Header extends React.Component {

  render() {
    return (
      <header className='header'>
        <nav className="nav">
          <ul>
            <li><a href="#">HOME</a></li>
            <li><a href="#">CATEGORIES</a></li>
            <li><a href="#">ARCHIVES</a></li>
            <li><a href="#">SIGN UP</a></li>
            <li><a href="#">SIGN IN</a></li>
          </ul>
        </nav>
      </header>
    )
  }

}

export default Header
