/** @flow */

import { ArticleList } from '../components/ArticleList'
import { connect } from 'react-redux'
import * as articleActions from '../actions/article'
import type { State } from '../reducers'

function mapStateToProps(state: State): Object {
  return {
    loading: state.articles.loading,
    articles: state.articles.articles.get(state.articles.pagination.current, []),
    pagination: state.articles.pagination,
  }
}

function mapDispatchToProps(dispatch: (_: Object) => void): Object {
  return {
    loadArticles(page: number) {
      dispatch(articleActions.fetchPage(page))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)
