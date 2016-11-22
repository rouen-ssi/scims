/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { Article as ArticleComponent } from '../components/Article'
import type { State } from '../reducers'
import type { Article } from '../services/articles'

class ArticleList extends React.Component {
  props: {
    currentPage: number,
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
        {this.props.articles.map((article, i) => (
          <ArticleComponent key={i} article={article}/>
        ))}
      </div>
    )
  }
}

function mapStateToProps(state: State): Object {
  return {
    articles: state.articles.articles,
  }
}

export default connect(mapStateToProps)(ArticleList)
