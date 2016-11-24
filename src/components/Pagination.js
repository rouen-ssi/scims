/** @flow */
import React from 'react'

function times(start, n) {
  const result = []
  for (let i = start; i < n; i++) {
    result.push(i)
  }
  return result
}

class PageLink extends React.Component {
  props: {
    page: number,
    type: 'previous' | 'next' | 'current' | void,
    loadPage: (page: number) => void,
  }

  render() {
    return (
      <a href="#" onClick={this._onClick} rel={this.props.type}>
        {this.renderBody()}
      </a>
    )
  }

  renderBody() {
    switch (this.props.type) {
      case 'previous':
        return <i className="fa fa-arrow-left"/>

      case 'next':
        return <i className="fa fa-arrow-right"/>

      default:
        return this.props.page
    }
  }

  _onClick = (e) => {
    e.preventDefault()
    this.props.loadPage(this.props.page)
    return false
  }
}

export class Pagination extends React.Component {
  props: {
    current: number,
    count: number,
    loadPage: (page: number) => void,
  }

  render() {
    const { current, count } = this.props

    return (
      <div className="pagination">
        <PageLink page={current - 1} type="previous" loadPage={this.props.loadPage}/>
        {times(current - 5, Math.min(9, count)).filter(i => i >= 0).map(i => i + 1).map(i => (
          <PageLink key={i} page={i} type={current === i && 'current'} loadPage={this.props.loadPage}/>
        ))}
        <a disabled>…</a>
        <PageLink page={current + 1} type="next" loadPage={this.props.loadPage}/>
      </div>
    )
  }
}
