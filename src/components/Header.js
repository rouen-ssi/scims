/** @flow */

import React from 'react'
import { truncateText, wrapPreventDefault } from '../utils'

import logo from '../assets/logo.png'
import { Link } from 'react-router'
import { Icon } from './icons/FontAwesome'
import type { IconType } from './icons/FontAwesome'
import { Dropdown } from './Dropdown'
import { TimeAgo } from './DateTime'

import type { User } from '../services/account'
import type { Article } from '../services/articles'

const HeaderLink = ({to = '#', icon, label, onClick}: {to?: string, label: string, icon: IconType, onClick?: () => void}) => (
  <span>
    <Icon type={icon}/>
    {' '}
    <Link to={to} onClick={onClick && wrapPreventDefault(onClick)}>{label}</Link>
  </span>
)

class AdminHeaderLink extends React.Component {
  state = {
    active: false,
  }

  render() {
    return (
      <li>
        <HeaderLink to="/admin" label="ADMIN" icon="shield" onClick={() => this.setState({ active: true })}/>
        <Dropdown open={this.state.active} onClose={() => this.setState({ active: false })}>
          <ul>
            <li><Link to="/admin/accounts"><Icon type="users"/> Manage Users</Link></li>
            <li><Link to="/admin/categories"><Icon type="database"/> Manage Categories</Link></li>
          </ul>
        </Dropdown>
      </li>
    )
  }
}

class UserHeader extends React.Component {
  props: {
    user: User,
    drafts: Array<Article>,
    loadDrafts: () => void,
  }

  static contextTypes = { router: React.PropTypes.any.isRequired }
  context: {
    router: Router,
  }

  state = {
    openDraft: false,
  }

  componentDidMount() {
    this.props.loadDrafts()
  }

  render() {
    return (
      <span>
        <li>
          <HeaderLink to="/draft" label="NEW ARTICLE" icon="plus" onClick={this._onClick}/>
          {this.renderDraftDropdown()}
        </li>
        <li><HeaderLink label="MY PROFILE" icon="user-circle"/></li>
        {this.props.user.role === 'admin' && <AdminHeaderLink/>}
        <li><HeaderLink to="/signout" label="SIGN OUT" icon="sign-out"/></li>
      </span>
    )
  }

  renderDraftDropdown() {
    if (this.props.drafts.length <= 0) {
      return null
    }

    const drafts = this.props.drafts.concat().sort((left, right) =>
      right.last_modification_date.localeCompare(left.last_modification_date))

    return (
      <Dropdown open={this.state.openDraft} onClose={() => this.setState({ openDraft: false })}>
        <ul>
          <li><Link to="/draft"><Icon type="file-text-o"/> Draft</Link></li>

          {drafts.map((draft, i) => (
            <li key={i}>{this.renderDraft(draft)}</li>
          ))}
        </ul>
      </Dropdown>
    )
  }

  renderDraft(draft: Article): React$Element<*> {
    return (
      <Link to={`/draft/${draft.id}`}>
        <Icon type="history"/>{' '}
        “{truncateText(draft.title, 25)}”,{' '}
        <strong>edited <TimeAgo value={draft.last_modification_date}/></strong>
      </Link>
    )
  }

  _onClick = () => {
    if (this.props.drafts.length <= 0) {
      this.context.router.push('/draft')
    } else {
      this.setState({ openDraft: !this.state.openDraft })
    }
  }
}

const GuestHeader = () => (
  <span>
    <li key="/signin"><HeaderLink to="/signin" label="SIGN IN" icon="sign-in"/></li>
  </span>
)

export class Header extends React.Component {
  props: {
    user: ?User,
    drafts: Array<Article>,
    loadDrafts: () => void,
  }

  render() {
    return (
      <header className='header'>
        <div className='header-wrap'>
          <img src={logo} alt="SciMS" className="logo"/>

          <nav className='nav'>
            <ul>
              <li><HeaderLink to="/" label="HOME" icon="home"/></li>
              {/* <li><HeaderLink to="/" label="CATEGORIES" icon="database"/></li> */}
              {/* <li><HeaderLink to="/" label="ARCHIVES" icon="archive"/></li> */}

              {this.renderUserHeader()}
            </ul>
          </nav>

          <div className='clear-float'></div>
        </div>
      </header>
    )
  }

  renderUserHeader() {
    const { user, drafts, loadDrafts } = this.props

    if (user) {
      return <UserHeader user={user} drafts={drafts} loadDrafts={loadDrafts}/>
    } else {
      return <GuestHeader />
    }
  }
}
