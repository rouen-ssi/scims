/** @flow */

import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { Article as ArticleComponent } from '../components/Article'
import { Link } from 'react-router'
import * as articleActions from '../actions/article'
import type { State } from '../reducers'
import type { Article } from '../services/articles'

function times(start, n) {
  const result = []
  for (let i = start; i < n; i++) {
    result.push(i)
  }
  return result
}

function Pagination({currentPage, pageCount}) {
  return (
    <div className="pagination">
      <Link to="/" className="previous"><i className="fa fa-arrow-left"/></Link>
      {times(currentPage - 5, Math.min(9, pageCount)).filter(i => i >= 0).map(i => i + 1).map(i => (
        <Link to="/" className={cx({active: currentPage === i})}>{i}</Link>
      ))}
      <a disabled>…</a>
      <Link to="/" className="next"><i className="fa fa-arrow-right"/></Link>
    </div>
  )
}

class ArticleList extends React.Component {
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

function mapStateToProps(state: State): Object {
  return {
    currentPage: state.articles.currentPage,
    pageCount: state.articles.pageCount,
    articles: (state.articles.articles[-1] || {})[state.articles.currentPage] || [],
  }
}

function mapDispatchToProps(dispatch: (_: Object) => void): Object {
  return {
    loadPage(page: number) {
      dispatch(articleActions.fetchArticles(undefined, page))
    },
    setPage(_page: number) {},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)
