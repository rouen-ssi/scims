/** @flow */

import { connect } from 'react-redux'
import { ArticleScreen } from '../components/ArticleScreen'
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
  const comments = state.comments.comments.get(articleId, [])

  return {
    loading: state.articles.loading,
    lastError: state.articles.lastError,
    article,
    categories,
    comments,
    currentUser: state.account.currentUser,
  }
}

export default connect(mapStateToProps)(ArticleScreen)
