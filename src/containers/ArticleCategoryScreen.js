/** @flow */

import { connect } from 'react-redux'

import { ArticleCategories } from '../components/ArticleCategories'
import * as categoryActions from '../actions/category'

import type { State } from '../reducers'

function mapStateToProps(state: State): Object {
  return {
    loading: state.categories.fetching,
    categories: state.categories.categories.valueSeq(),
    lastError: state.categories.lastError,
  }
}

function mapDispatchToProps(dispatch: (_: any) => void): Object {
  return {
    fetchCategories: () => dispatch(categoryActions.fetchAll()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCategories)
