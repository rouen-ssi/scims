/** @flow */
import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router'

function times(start, n) {
  const result = []
  for (let i = start; i < n; i++) {
    result.push(i)
  }
  return result
}

export class Pagination extends React.Component {
  props: {
    currentPage: number,
    pageCount: number,
  }

  render() {
    const { currentPage, pageCount } = this.props

    return (
      <div className="pagination">
        <Link to="/" className="previous"><i className="fa fa-arrow-left"/></Link>
        {times(currentPage - 5, Math.min(9, pageCount)).filter(i => i >= 0).map(i => i + 1).map(i => (
          <Link to="/" className={cx({active: currentPage === i})}>{i}</Link>
        ))}
        <a disabled>…</a>
        <Link to="/" className="next"><i className="fa fa-arrow-right"/></Link>
      </div>
    )
  }
}
