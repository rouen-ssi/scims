/** @flow */

import React from 'react'
import { truncateText } from '../utils'

import { Link } from 'react-router'
import { Icon } from './icons/FontAwesome'
import type { IconType } from './icons/FontAwesome'
import { Dropdown } from './Dropdown'
import { TimeAgo } from './DateTime'

import type { Article } from '../services/articles'

const HeaderLink = ({to, icon, label, onClick}: {to: string, label: string, icon: IconType, onClick?: (_: Event) => boolean}) => (
  <span>
    <Icon type={icon}/>
    {' '}
    <Link to={to} onClick={onClick}>{label}</Link>
  </span>
)

class UserHeader extends React.Component {
  props: {
    drafts: Array<Article>,
  }

  static contextTypes = { router: React.PropTypes.any.isRequired }
  context: {
    router: Router,
  }

  state = {
    openDraft: false,
  }

  render() {
    return (
      <span>
        <li key="/draft">
          <HeaderLink to="/draft" label="NEW ARTICLE" icon="plus" onClick={this._onClick}/>

          {this.renderDraftDropdown()}
        </li>
        <li key="/me"><HeaderLink to="/me" label="MY PROFILE" icon="user-circle"/></li>
        <li key="/signout"><HeaderLink to="/signout" label="SIGN OUT" icon="sign-out"/></li>
      </span>
    )
  }

  renderDraftDropdown() {
    if (this.props.drafts.length <= 0) {
      return null
    }

    return (
      <Dropdown open={this.state.openDraft} onClose={() => this.setState({ openDraft: false })}>
        <ul>
          <li><Link to="/draft"><Icon type="file-text-o"/> Draft</Link></li>

          {this.props.drafts.map((draft, i) => (
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
        “{truncateText(draft.title, 50)}”,{' '}
        <strong><TimeAgo value={draft.publication_date}/></strong>
      </Link>
    )
  }

  _onClick = (e: Event) => {
    e.preventDefault()

    if (this.props.drafts.length <= 0) {
      this.context.router.push('/draft')
    } else {
      this.setState({ openDraft: !this.state.openDraft })
    }

    return false
  }
}

const GuestHeader = () => (
  <span>
    <li key="/signup"><HeaderLink to="/signup" label="SIGN UP" icon="user-plus"/></li>
    <li key="/signin"><HeaderLink to="/signin" label="SIGN IN" icon="sign-in"/></li>
  </span>
)

export class Header extends React.Component {
  props: {
    logged: boolean,
    drafts: Array<Article>,
    loadDrafts: () => void,
  }

  componentDidMount() {
    this.props.loadDrafts()
  }

  render() {
    return (
      <header className='header'>
        <div className='header-wrap'>
          <h1 className='logo'>SciMS</h1>

          <nav className='nav'>
            <ul>
              <li><HeaderLink to="/" label="HOME" icon="home"/></li>
              <li><HeaderLink to="/" label="CATEGORIES" icon="database"/></li>
              <li><HeaderLink to="/" label="ARCHIVES" icon="archive"/></li>

              {this.renderUserHeader()}
            </ul>
          </nav>

          <div className='clear-float'></div>
        </div>
      </header>
    )
  }

  renderUserHeader() {
    if (this.props.logged) {
      return <UserHeader drafts={this.props.drafts}/>
    } else {
      return <GuestHeader />
    }
  }
}
