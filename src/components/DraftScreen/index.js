/** @flow */

import React from 'react'

import { Link } from 'react-router'
import { Icon } from '../../components/icons/FontAwesome'
import { TextInput, DateInput, ContentInput } from './Input'

import type { User } from '../../services/account'

export class DraftScreen extends React.Component {
  props: {
    currentUser: User,
  }

  state: {
    title: string,
    publication_date: string,
    content: string,
  }

  constructor(props: *, context: *) {
    super(props, context)

    let state = window.localStorage.getItem('@SCIMS/DraftScreen')
    if (state) {
      this.state = JSON.parse(state)
    } else {
      this.state = {
        title: '',
        publication_date: '',
        content: '',
      }
    }
  }

  componentDidUpdate() {
    window.localStorage.setItem('@SCIMS/DraftScreen', JSON.stringify(this.state))
  }

  render() {
    return (
      <article className='bloc draft'>
        <h2>
          <TextInput value={this.state.title} placeholder="Lorem ipsum dolor sit amet, consectetur adipisicing elit." onChange={this.onChange('title')}/>
        </h2>

        <div className='article-infos'>
          <ul>
            <li><Icon type="calendar"/> <DateInput value={this.state.publication_date} onChange={this.onChange('publication_date')}/></li>
            <li><Icon type="user"/> {this.props.currentUser.first_name} {this.props.currentUser.last_name}</li>
            <li><Link to='#'><Icon type="share"/> Share</Link></li>
          </ul>
        </div>

        <div className="article-body">
          <ContentInput value={this.state.content} onChange={this.onChange('content')} placeholder="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat temporibus sint, minima exercitationem. Praesentium enim eveniet dolor expedita quia, ea ab, iusto unde in facere perspiciatis molestias officiis consequatur tempora."/>
        </div>
      </article>
    )
  }

  onChange<T>(fieldName: string): (_: T) => void {
    return (value: T, callback?: () => void) => {
      this.setState({ [fieldName]: value }, () => {
        if (callback) {
          callback()
        }
      })
    }
  }
}
