/** @flow */

import { connect } from 'react-redux'

import { DraftScreen } from '../components/DraftScreen'

import * as articleActions from '../actions/article'
import * as categoryActions from '../actions/category'
import type { Article } from '../services/articles'
import type { State } from '../reducers'

type Props = {
  routeParams: {
    draftId: ?string,
  },
}

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

function mapDispatchToProps(dispatch: (_: any) => void, props: Props): any {
  const draftId = parseInt(props.routeParams.draftId, 10)

  return {
    loadDraft() {
      if (draftId) {
        dispatch(articleActions.fetchDraft(draftId))
      } else {
        dispatch(articleActions.createDraft())
      }
    },

    unloadDraft() {
      dispatch(articleActions.draft(null, []))
    },

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
