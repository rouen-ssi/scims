/** @flow */

import React from 'react'

import { EditorState, ContentState } from 'draft-js'
import { Link } from 'react-router'
import { Icon } from '../../components/icons/FontAwesome'
import { TextInput, DateInput, ContentInput } from './Input'

import type { User } from '../../services/account'

const loremContentState = ContentState.createFromText('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum quaerat illum incidunt odit voluptatem delectus. Rem aperiam, placeat dolor hic facilis quo! Sunt, deserunt quam excepturi placeat unde velit sequi!')

export class DraftScreen extends React.Component {
  props: {
    currentUser: User,
  }

  state = {
    title: '',
    publication_date: '',
    content: EditorState.createWithContent(loremContentState),
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
          <ContentInput value={this.state.content} onChange={this.onChange('content')}/>
        </div>
      </article>
    )
  }

  onChange<T>(fieldName: string): (_: T) => void {
    return (value) => {
      this.setState({ [fieldName]: value })
    }
  }
}
