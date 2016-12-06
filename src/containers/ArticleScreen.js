/** @flow */

import { connect } from 'react-redux'
import { ArticleScreen } from '../components/ArticleScreen'
import * as articleActions from '../actions/article'
import type { State } from '../reducers'

type Props = {
  routeParams: {
    articleId: string,
  },
}

function mapStateToProps(state: State, props: Props): Object {
  const articleId = parseInt(props.routeParams.articleId, 10)
  const article = state.articles.articlesById.get(articleId)
  const categories = state.categories.categories.valueSeq().toJS()

  return {
    loading: state.articles.loading,
    lastError: state.articles.lastError,
    article,
    categories,
  }
}

function mapDispatchToProps(dispatch: (_: any) => void, props: Props): Object {
  const articleId = parseInt(props.routeParams.articleId, 10)

  return {
    loadArticle() {
      dispatch(articleActions.fetchOne(articleId))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleScreen)
