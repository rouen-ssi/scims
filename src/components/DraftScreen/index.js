/** @flow */

import React from 'react'
import { deepEqual, wrapPreventDefault } from '../../utils'

import { Link } from 'react-router'
import { Icon } from '../icons/FontAwesome'
import { Spinner } from '../Spinner'
import { DateInput, ContentInput, CategoryInput } from './Input'

import type { User } from '../../services/account'
import type { Article } from '../../services/articles'
import type { Category } from '../../services/categories'

type Props = {
  loading: boolean,
  currentUser: ?User,
  draft: ?Article,
  categories: Array<Category>,
  saveDraft: (article: Article) => void,
  publishDraft: (article: Article) => void,
  loadCategories: () => void,
}

export class DraftScreen extends React.Component {
  props: Props

  state = {
    currentDraft: this.props.draft,
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!deepEqual(nextProps.draft, this.state.currentDraft)) {
      this.setState({ currentDraft: nextProps.draft })
    }
  }

  render() {
    if (this.props.loading) {
      return <Spinner/>
    }

    const { currentDraft } = this.state

    if (!currentDraft) {
      return (
        <div className="main-content center">
          <div className="bloc">
            <h2>Draft not found.</h2>
          </div>
        </div>
      )
    }

    const { currentUser } = this.props

    if (!currentUser || currentDraft.user.uid !== currentUser.uid && currentDraft.id !== 0) {
      return (
        <div className="main-content center">
          <div className="block">
            <h2>Access forbidden</h2>
          </div>
        </div>
      )
    }

    return (
      <article className='bloc draft'>
        <h2>
          <ContentInput value={currentDraft.title} placeholder="Lorem ipsum dolor sit amet, consectetur adipisicing elit." onChange={this.onChange('title')}/>
        </h2>

        <div className='article-infos'>
          <ul>
            <li><Icon type="calendar"/> <DateInput value={currentDraft.publication_date} onChange={this.onChange('publication_date')}/></li>
            <li><Icon type="user"/> {currentUser.first_name} {currentUser.last_name}</li>
            {this.renderCategory(currentDraft)}
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

  renderCategory(currentDraft: Article) {
    return (
      <li>
        <Icon type="database"/>{' '}
        <CategoryInput value={currentDraft.category_id} placeholder="Category" categories={this.props.categories} onChange={this.onChange('category_id')} loadCategories={this.props.loadCategories}/>
      </li>
    )
  }

  renderSaveButton(currentDraft: Article) {
    if (deepEqual(currentDraft, this.props.draft)) {
      return
    }
    return <li><Link to="#" onClick={wrapPreventDefault(this.props.saveDraft.bind(this, currentDraft))}><Icon type="save"/> Save</Link></li>
  }

  renderPublishButton(currentDraft: Article) {
    if (!currentDraft.is_draft || currentDraft.id === 0) {
      return
    }
    return <li><Link to="#" onClick={wrapPreventDefault(this.props.publishDraft.bind(this, currentDraft))}><Icon type="feed"/> Publish</Link></li>
  }

  // $FlowFixMe: expected object type and string literal as arguments to $PropertyType
  onChange<K: $Enum<Article>>(fieldName: K): (value: $PropertyType<Article, K>, callback?: () => void) => void {
    return (value, callback) => {
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
