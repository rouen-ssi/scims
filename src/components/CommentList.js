/** @flow */

import React from 'react'

import { TimeAgo } from './DateTime'
import { Link } from 'react-router'

import type { Comment } from '../services/comments'

export class CommentComponent extends React.Component {
  props: {
    comment: Comment,
    comments: Array<Comment>,
  }

  render() {
    return (
      <div className="comment">
        <img className="avatar" src={`https://api.adorable.io/avatars/50/${this.props.comment.user.email}.png`}/>

        <div className="details">
          <a href="#" className="author">
            {this.props.comment.user.first_name}
            {' '}{this.props.comment.user.last_name}
          </a>
          <TimeAgo className="publication_date" value={this.props.comment.publication_date}/>
        </div>

        <div className="content">{this.props.comment.content}</div>

        <div className="actions">
          <Link to="#">Reply</Link>
        </div>

        <CommentList comments={this.props.comments} parentCommentId={this.props.comment.id}/>
      </div>
    )
  }
}

export class CommentList extends React.Component {
  props: {
    comments: Array<Comment>,
    parentCommentId: number | -1,
  }

  render() {
    const comments = this.props.comments.filter(x => x.parent_comment_id === this.props.parentCommentId)

    if (comments.length <= 0) {
      return null
    }

    return (
      <div className="comments">
        {comments.map((x, i) => <CommentComponent key={i} comment={x} comments={this.props.comments}/>)}
      </div>
    )
  }
}
