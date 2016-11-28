/** @flow */

import React from 'react'

import { EditorState, ContentState, convertFromRaw, convertToRaw } from 'draft-js'
import { Link } from 'react-router'
import { Icon } from '../../components/icons/FontAwesome'
import { TextInput, DateInput, ContentInput } from './Input'

import type { User } from '../../services/account'

const loremContentState = ContentState.createFromText('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex animi repellat cum accusantium tempore, earum quas placeat, odio itaque pariatur. Fuga maxime, repudiandae, dignissimos dolore itaque ipsa vitae magni maiores. Sunt ut veritatis dignissimos corrupti natus porro sed repellat reprehenderit doloribus officia ea culpa ipsum harum labore minima voluptatum repudiandae vero dolor veniam quo obcaecati, aperiam molestiae voluptatem aliquam! Ipsa! Hic at vel deserunt culpa reiciendis repellat quis perspiciatis minima placeat. Aspernatur consectetur aliquid assumenda mollitia, quos maxime. Sint, quia facilis nulla, quae suscipit deserunt. Iste sunt, dolores voluptates quibusdam. Tempora officiis pariatur quas tempore excepturi unde nemo, quis dolores accusantium id. Facilis fugiat quaerat delectus quidem, debitis dicta, eum dolore quo maxime consequuntur quod deleniti eligendi doloremque similique eius. Ullam repudiandae et, sint soluta eos quaerat illum? Suscipit, nesciunt. Aperiam tenetur minus nam nulla numquam, obcaecati harum est. Incidunt natus sunt nostrum odit recusandae, eveniet adipisci esse, quisquam asperiores.')

export class DraftScreen extends React.Component {
  props: {
    currentUser: User,
  }

  state: {
    title: string,
    publication_date: string,
    content: EditorState,
  }

  constructor(props: *, context: *) {
    super(props, context)

    let state = window.localStorage.getItem('@SCIMS/DraftScreen')
    if (state) {
      state = JSON.parse(state)
      this.state = {
        ...state,
        content: EditorState.createWithContent(convertFromRaw(state.content)),
      }
    } else {
      this.state = {
        title: '',
        publication_date: '',
        content: EditorState.createWithContent(loremContentState),
      }
    }
  }

  componentDidUpdate() {
    window.localStorage.setItem('@SCIMS/DraftScreen', JSON.stringify({
      ...this.state,
      content: convertToRaw(this.state.content.getCurrentContent()),
    }))
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
    return (value: T, callback?: () => void) => {
      this.setState({ [fieldName]: value }, () => {
        if (callback) {
          callback()
        }
      })
    }
  }
}
