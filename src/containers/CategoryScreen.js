/** @flow */
import { connect } from 'react-redux'
import type { State } from '../reducers'
import * as articleActions from '../actions/article'

import { CategoryScreen } from '../components/CategoryScreen'

type Props = {
  routeParams: {
    categoryId?: string,
  },
}

function mapStateToProps(state: State, props: Props): Object {
  const categoryId = parseInt(props.routeParams.categoryId, 10) || null
  const category = categoryId && state.categories.categories.get(categoryId)
  const pagination = state.articles.pagination
  const articles = state.articles.articlesByPage.get(pagination.current, [])

  return {
    loadingCategory: state.categories.fetching,
    loadingArticles: state.articles.loading,
    categories: state.categories.categories.valueSeq().toJS(),
    category,
    pagination,
    articles,
  }
}

function mapDispatchToProps(dispatch: (action: any) => void, props: Props): Object {
  const categoryId = parseInt(props.routeParams.categoryId, 10) || null

  return {
    loadArticles(page: number) {
      dispatch(articleActions.fetchPage(page, categoryId))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen)
