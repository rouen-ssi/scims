/** @flow */
import { connect } from 'react-redux'
import type { State } from '../reducers/index'
import * as articleActions from '../actions/article'

import { ArticleCategory } from '../components/ArticleCategory'

type Props = {
  routeParams: {
    categoryId: string,
  },
}

function mapStateToProps(state: State, props: Props): Object {
  const categoryId = parseInt(props.routeParams.categoryId, 10)
  const category = state.categories.categories.find(x => x.id === categoryId)
  const articles = state.articles.articles.filter(x => x.category_id === categoryId)

  return {
    category,
    categories: state.categories.categories,
    articles,
  }
}

function mapDispatchToProps(dispatch: (action: any) => void): Object {
  return {
    loadArticles(categoryId: number) {
      dispatch(articleActions.fetchArticlesByCategory(categoryId))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCategory)
