/** @flow */
import { connect } from 'react-redux'
import type { State } from '../reducers'
import * as categoryActions from '../actions/category'

import { ArticleCategory } from '../components/ArticleCategory'

type Props = {
  routeParams: {
    categoryId: string,
  },
}

function mapStateToProps(state: State, props: Props): Object {
  const categoryId = parseInt(props.routeParams.categoryId, 10)
  const category = state.categories.categories.find(x => x.id === categoryId) || null
  const articles = (state.articles.articles[categoryId] || {})[state.articles.currentPage] || []

  return {
    category,
    categories: state.categories.categories,
    articles,
  }
}

function mapDispatchToProps(dispatch: (action: any) => void): Object {
  return {
    loadCategory(categoryId: number) {
      dispatch(categoryActions.fetchCategory(categoryId))
    },
    loadArticles(_categoryId: number) {

    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCategory)
