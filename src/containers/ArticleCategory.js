import { connect } from 'react-redux'

import { ArticleCategory } from '../components/ArticleCategory'

function mapStateToProps(state, { routeParams: params }) {
  const categoryId = parseInt(params.categoryId, 10)
  const category = state.categories.categories.find(x => x.id === categoryId)

  return {
    category,
    categories: state.categories.categories,
  }
}

export default connect(mapStateToProps)(ArticleCategory)
