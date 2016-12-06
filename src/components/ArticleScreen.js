/** @flow */

import React from 'react'

import { Spinner } from './Spinner'
import { DateTime } from './DateTime'
import { Link, DraftLink } from './Link'
import { Icon } from './icons/FontAwesome'
import { CategoryBreadcrumbs } from './CategoryBreadcrumbs'

import ArticleCommentList from '../containers/ArticleCommentList'

import type { Article } from '../services/articles'
import type { Category } from '../services/categories'
import type { User } from '../services/account'

type Props = {
  loading: boolean,
  article: ?Article,
  categories: Array<Category>,
  currentUser: ?User,

  loadArticle: () => void,
}

export class ArticleScreen extends React.Component {
  props: Props

  componentWillMount() {
    this.props.loadArticle()
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  componentWillUpdate(nextProps: Props) {
    if (!nextProps.loading) {
      nextProps.loadArticle()
    }
  }

  render() {
    if (this.props.loading) {
      return <Spinner />
    }

    const { article } = this.props

    if (!article) {
      return (
        <div className="main-content left">
          <div className="bloc">
            <h2>Article not found</h2>
          </div>
        </div>
      )
    }

    return (
      <div>
        <h2>
          <CategoryBreadcrumbs
            category={this.props.categories.find(x => x.id === article.category_id)}
            categories={this.props.categories}
            article={article}
          />
        </h2>

        <article className='bloc article'>
          <h2>
            {article.title}
          </h2>

          <div className='article-infos'>
            <ul>
              <li><Icon type="calendar"/> <DateTime value={article.publication_date}/></li>
              <li><Icon type="user"/> {article.user.first_name} {article.user.last_name}</li>
              <li><Link to='#'><Icon type="share"/> Share</Link></li>
              {this.renderEditButton(article)}
            </ul>
          </div>

          <div className="article-body">
            {article.content}
          </div>

          <ArticleCommentList article={article}/>
        </article>
      </div>
    )
  }

  renderEditButton(article: Article) {
    if (!this.props.currentUser || this.props.currentUser.uid !== article.user.uid) {
      return null
    }

    return (
      <li>
        <DraftLink draft={article}>
          <Icon type="pencil"/> Edit
        </DraftLink>
      </li>
    )
  }
}
