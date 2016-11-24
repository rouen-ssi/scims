/** @flow */
import React from 'react'
import { connect } from 'react-redux'

import * as articleActions from '../actions/article'

function times(start, n) {
  const result = []
  for (let i = start; i < n; i++) {
    result.push(i)
  }
  return result
}

const PageLink = connect(
  undefined,
  (dispatch) => ({
    loadPage: (page) => dispatch(articleActions.fetchPage(page)),
  })
)(
  class extends React.Component {
    props: {
      page: number,
      type: 'previous' | 'next' | 'current' | void,
      loadPage: (page: number) => void,
    }

    render() {
      return (
        <a href="#" onClick={this._onClick} rel={this.props.type}>
          {this.props.children}
        </a>
      )
    }

    _onClick = (e) => {
      e.preventDefault()
      this.props.loadPage(this.props.page)
      return false
    }
  }
)

export class Pagination extends React.Component {
  props: {
    current: number,
    count: number,
  }

  render() {
    const { current, count } = this.props

    return (
      <div className="pagination">
        <PageLink page={current - 1} type="previous"> <i className="fa fa-arrow-left"/> </PageLink>
        {times(current - 5, Math.min(9, count)).filter(i => i >= 0).map(i => i + 1).map(i => (
          <PageLink key={i} page={i} type={current === i && 'current'}>{i}</PageLink>
        ))}
        <a disabled>…</a>
        <PageLink page={current + 1} type="next"> <i className="fa fa-arrow-right"/> </PageLink>
      </div>
    )
  }
}
