/** @flow */

import { connect } from 'react-redux'

import { DraftScreen } from '../components/DraftScreen'

import * as articleActions from '../actions/article'
import * as categoryActions from '../actions/category'
import type { Article } from '../services/articles'
import type { State } from '../reducers'

function mapStateToProps(state: State): any {
  const draft = state.articles.currentDraft.draft
  const currentUser = state.account.currentUser

  return {
    loading: state.articles.loading,
    currentUser,
    draft,
    categories: state.categories.categories.valueSeq().toJS(),
  }
}

function mapDispatchToProps(dispatch: (_: any) => void): any {
  return {
    saveDraft(article: Article) {
      dispatch(articleActions.updateDraft(article))
    },

    publishDraft(article: Article) {
      dispatch(articleActions.updateDraft({
        ...article,
        is_draft: false,
      }))
    },

    loadCategories() {
      dispatch(categoryActions.fetchAll())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DraftScreen)
