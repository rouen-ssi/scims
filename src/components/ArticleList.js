/** @flow */
import React from 'react'

import { Article as ArticleComponent } from './Article'
import { Pagination } from './Pagination'
import { Spinner } from './Spinner'

import type { Article } from '../services/articles'

export class ArticleList extends React.Component {
  props: {
    loading: boolean,
    articles: Array<Article>,
    pagination: { current: number, count: number },

    loadArticles: (page: number) => void,
  }

  render() {
    return (
      <div>
        {this.renderArticles()}

        <Pagination {...this.props.pagination} loadPage={this.props.loadArticles}/>
      </div>
    )
  }

  renderArticles() {
    if (this.props.loading) {
      return <Spinner />
    }

    return this.props.articles.map((article, i) => (
      <ArticleComponent key={i} article={article}/>
    ))
  }
}
