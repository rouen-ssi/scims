/** @flow */

import { ArticleList } from '../components/ArticleList'
import { connect } from 'react-redux'
import type { State } from '../reducers'

function mapStateToProps(state: State): Object {
  return {
    articles: [],
  }
}

function mapDispatchToProps(dispatch: (_: Object) => void): Object {
  return {
    loadPage(page: number) {

    },
    setPage(page: number) {

    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)
