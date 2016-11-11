import { connect } from 'react-redux'

import { ArticleCategories } from '../components/ArticleCategories'
import * as categoryActions from '../actions/category'

function mapStateToProps(state) {
  return {
    loading: state.categories.fetching,
    categories: state.categories.categories,
    lastError: state.categories.lastError,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => dispatch(categoryActions.fetchAll()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCategories)
