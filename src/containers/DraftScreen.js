/** @flow */

import { connect } from 'react-redux'

import { DraftScreen } from '../components/DraftScreen'

import * as articleActions from '../actions/article'
import type { Article } from '../services/articles'
import type { State } from '../reducers'

type Props = {
  routeParams: {
    draftId: ?string,
  },
}

function mapStateToProps(state: State, props: Props): any {
  const draft: ?Article = state.articles.currentDraft.draft

  return {
    requestDraftId: props.routeParams.draftId && parseInt(props.routeParams.draftId, 10),
    loading: !draft || state.articles.loading,
    currentUser: state.account.currentUser,
    draft,
  }
}

function mapDispatchToProps(dispatch: (_: any) => void): any {
  return {
    loadDraft(draftId: ?number) {
      if (!draftId) {
        dispatch(articleActions.createDraft({}))
      } else {
        dispatch(articleActions.fetchDraft(draftId))
      }
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DraftScreen)
