/** @flow */

import React from 'react'
import { deepEqual, wrapPreventDefault } from '../../utils'

import { Link } from 'react-router'
import { Icon } from '../icons/FontAwesome'
import { Spinner } from '../Spinner'
import { TextInput, DateInput, ContentInput } from './Input'

import type { User } from '../../services/account'
import type { Article } from '../../services/articles'

type Props = {
  currentUser: User,
  requestDraftId: ?number,
  draft: ?Article,
  loadDraft: (draftId: ?number) => void,
  saveDraft: (article: Article) => void,
  publishDraft: (article: Article) => void,
}

export class DraftScreen extends React.Component {
  props: Props

  state = {
    currentDraft: this.props.draft,
  }

  componentDidMount() {
    this.props.loadDraft(this.props.requestDraftId)
  }

  componentWillReceiveProps(props: Props) {
    if (props.draft && props.draft.id !== props.requestDraftId) {
      props.loadDraft(props.requestDraftId)
    } else if (!deepEqual(props.draft, this.state.currentDraft)) {
      this.setState({ currentDraft: props.draft })
    }
  }

  render() {
    if (this.props.loading || !this.state.currentDraft) {
      return <Spinner/>
    }

    const { currentDraft } = this.state

    return (
      <article className='bloc draft'>
        <h2>
          <TextInput value={currentDraft.title} placeholder="Lorem ipsum dolor sit amet, consectetur adipisicing elit." onChange={this.onChange('title')}/>
        </h2>

        <div className='article-infos'>
          <ul>
            <li><Icon type="calendar"/> <DateInput value={currentDraft.publication_date} onChange={this.onChange('publication_date')}/></li>
            <li><Icon type="user"/> {this.props.currentUser.first_name} {this.props.currentUser.last_name}</li>
            {this.renderSaveButton(currentDraft)}
            {this.renderPublishButton(currentDraft)}
          </ul>
        </div>

        <div className="article-body">
          <ContentInput value={currentDraft.content} onChange={this.onChange('content')} placeholder="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat temporibus sint, minima exercitationem. Praesentium enim eveniet dolor expedita quia, ea ab, iusto unde in facere perspiciatis molestias officiis consequatur tempora."/>
        </div>
      </article>
    )
  }

  renderSaveButton(draft: Article) {
    if (deepEqual(draft, this.props.draft)) {
      return
    }
    return <li><Link to="#" onClick={wrapPreventDefault(this.props.saveDraft.bind(this, draft))}><Icon type="save"/> Save</Link></li>
  }

  renderPublishButton(draft: Article) {
    if (!draft.is_draft) {
      return
    }
    return <li><Link to="#" onClick={wrapPreventDefault(this.props.publishDraft.bind(this, draft))}><Icon type="feed"/> Publish</Link></li>
  }

  onChange(fieldName: 'title' | 'publication_date' | 'content'): (_: string) => void {
    return (value: string, callback?: () => void) => {
      const draft = this.state.currentDraft
      if (!draft) {
        return
      }

      const newDraft: Article = {
        ...draft,
        [fieldName]: value,
      }

      this.setState({ currentDraft: newDraft }, () => {
        if (callback) {
          callback()
        }
      })
    }
  }
}
