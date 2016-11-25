/** @flow */

import React from 'react'

import { Spinner } from './Spinner'
import { DateTime } from './DateTime'
import { Link } from 'react-router'

import ArticleCommentList from '../containers/ArticleCommentList'

import type { Article } from '../services/articles'

export class ArticleScreen extends React.Component {
  props: {
    loading: boolean,
    lastError: ?Error,
    article: Article,

    loadArticle: () => void,
  }

  componentDidMount() {
    this.props.loadArticle()
    window.scrollTo(0, 0)
  }

  render() {
    if (this.props.loading) {
      return <Spinner />
    }

    return (
      <article className='bloc article'>
        <h2>
          {this.props.article.title}
        </h2>

        <div className='article-infos'>
          <ul>
            <li><i className='fa fa-calendar'></i> <DateTime value={this.props.article.publication_date}/></li>
            <li><i className='fa fa-user'></i> {this.props.article.user.first_name} {this.props.article.user.last_name}</li>
            <li><Link to='#'><i className='fa fa-share'></i>Share</Link></li>
          </ul>
        </div>

        <div className="article-body">
          {this.props.article.content}
        </div>

        <ArticleCommentList article={this.props.article}/>
      </article>
    )
  }
}
