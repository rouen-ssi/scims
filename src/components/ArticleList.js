/** @flow */
import React from 'react'
import { Article as ArticleComponent } from '../components/Article'
import { Pagination } from '../components/Pagination'
import type { Article } from '../services/articles'

export class ArticleList extends React.Component {
  props: {
    currentPage: number,
    pageCount: number,
    articles: Array<Article>,

    loadPage: (page: number) => void,
    setPage: (page: number) => void,
  }

  componentDidMount() {
    if (this.props.articles.length <= 0) {
      this.props.loadPage(this.props.currentPage)
    }
  }

  render() {
    return (
      <div>
        <Pagination currentPage={this.props.currentPage} pageCount={this.props.pageCount}/>

        {this.props.articles.map((article, i) => (
          <ArticleComponent key={i} article={article}/>
        ))}
      </div>
    )
  }
}
