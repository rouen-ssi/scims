/** @flow */
import React from 'react'
import { Range } from 'immutable'

class PageLink extends React.Component {
  props: {
    page: number,
    type?: 'previous' | 'next' | 'current' | 'first' | 'last' | false,
    disabled?: boolean,
    loadPage: (page: number) => void,
  }

  render() {
    return (
      <a href="#" onClick={this._onClick} rel={this.props.type || undefined} disabled={this.props.disabled}>
        {this.renderBody()}
      </a>
    )
  }

  renderBody() {
    switch (this.props.type) {
      case 'previous':
        return <i className="fa fa-step-backward"/>

      case 'next':
        return <i className="fa fa-step-forward"/>

      case 'first':
        return <i className="fa fa-fast-backward"/>

      case 'last':
        return <i className="fa fa-fast-forward"/>

      default:
        return this.props.page
    }
  }

  _onClick = (e) => {
    e.preventDefault()
    if (!this.props.disabled) {
      this.props.loadPage(this.props.page)
      window.scrollTo(0, 0)
    }
    return false
  }
}

const pos = x => x > 0 ? x : 0

export class Pagination extends React.Component {
  props: {
    current: number,
    count: number,
    loadPage: (page: number) => void,
  }

  render() {
    const { current, count } = this.props

    const horizon = 3
    const start = Math.max(1, current - horizon - pos(horizon - count + current))
    const end = Math.min(count, current + horizon + pos(horizon - current + 1)) + 1

    return (
      <div className="pagination">
        {this.renderFirst()}
        {this.renderPrevious()}

        {start > 1 && <a disabled className="ellipsis"><i className="fa fa-ellipsis-h"/></a>}

        {Range(start, end).map(i => (
          <PageLink key={i} page={i} type={current === i && 'current'} loadPage={this.props.loadPage}/>
        ))}

        {end < count && <a disabled className="ellipsis"><i className="fa fa-ellipsis-h"/></a>}

        {this.renderNext()}
        {this.renderLast()}
      </div>
    )
  }

  renderPrevious() {
    return <PageLink page={this.props.current - 1} type="previous" loadPage={this.props.loadPage} disabled={this.props.current === 1}/>
  }

  renderFirst() {
    return <PageLink page={1} type="first" loadPage={this.props.loadPage} disabled={this.props.current === 1}/>
  }

  renderNext() {
    return <PageLink page={this.props.current + 1} type="next" loadPage={this.props.loadPage} disabled={this.props.current === this.props.count}/>
  }

  renderLast() {
    return <PageLink page={this.props.count} type="last" loadPage={this.props.loadPage} disabled={this.props.current === this.props.count}/>
  }
}
