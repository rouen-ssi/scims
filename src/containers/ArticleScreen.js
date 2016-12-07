/** @flow */

import { connect } from 'react-redux'
import { ArticleScreen } from '../components/ArticleScreen'
import * as articleActions from '../actions/article'
import type { State } from '../reducers'

type Props = {
  router: Router,
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

function mapDispatchToProps(dispatch: (_: any) => void, props: Props): Object {
  const articleId = parseInt(props.routeParams.articleId, 10)

  return {
    async deleteArticle() {
      await dispatch(articleActions.requestArticleDeletion(articleId))
      props.router.replace('/')
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleScreen)
