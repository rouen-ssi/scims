/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import { Spinner } from '../components/Spinner'
import { CommentList } from '../components/CommentList'

import * as commentActions from '../actions/comment'

import type { State } from '../reducers'
import type { Comment } from '../services/comments'
import type { Article } from '../services/articles'

type InProps = {
  article: Article,
}

type OutProps = {
  loading: boolean,
  comments?: Array<Comment>,
  loadComments: () => void,
}

class ArticleCommentList extends React.Component<*, InProps & OutProps, *> {
  componentDidMount() {
    this.props.loadComments()
  }

  render() {
    if (this.props.loading || !this.props.comments) {
      return <Spinner />
    }

    return (
      <div className="article-comments">
        <CommentList comments={this.props.comments} parentCommentId={null} />
      </div>
    )
  }
}

function mapStateToProps(state: State, props: InProps): $Shape<OutProps> {
  const comments = state.comments.comments.get(props.article.id, [])

  return {
    loading: state.comments.loading,
    comments,
  }
}

function mapDispatchToProps(dispatch: (_: any) => void, props: InProps): $Shape<OutProps> {
  return {
    loadComments() {
      dispatch(commentActions.fetch(props.article.id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCommentList)
