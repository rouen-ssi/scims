import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

const LoggedHeader = [
  <li key="/me"><Link to="/me">MY PROFILE</Link></li>,
  <li key="/signout"><Link to="/signout">SIGN OUT</Link></li>,
]

const GuestHeader = [
  <li key="/signup"><Link to="/signup">SIGN UP</Link></li>,
  <li key="/signin"><Link to="/signin">SIGN IN</Link></li>,
]

const Header = ({logged}) => (
  <header className='header'>
    <div className='header-wrap'>
      <h1 className='logo'>SciMS</h1>
      <nav className='nav'>
        <ul>
          <li><Link to='/'>HOME</Link></li>
          <li><a href='#'>CATEGORIES</a></li>
          <li><a href='#'>ARCHIVES</a></li>

          { logged ? LoggedHeader : GuestHeader }
        </ul>
      </nav>
      <div className='clear-float'></div>
    </div>
  </header>
)

function mapStateToProps(state) {
  return {
    logged: !!state.account.currentUser,
  }
}

export default connect(mapStateToProps)(Header)
