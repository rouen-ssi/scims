/** @flow */
import React from 'react'

import { Spinner } from './Spinner'
import { CategoryLink } from './Link'

import type { Category } from '../services/categories'

/**
 * Displays an evolving list of categories
 */
export class CategoryList extends React.Component {
  props: {
    loading: boolean,
    categories: Array<Category>,
    lastError: ?Error,
  }

  render() {
    return (
      <div className="sidebar-bloc">
        <h1>Categories</h1>
        {this.renderList()}
      </div>
    )
  }

  renderList() {
    if (this.props.loading) {
      return <Spinner/>
    } else if (this.props.lastError) {
      return <em>{this.props.lastError.message}</em>
    }

    if (this.props.categories.length <= 0) {
      return (
        <span>
          No child categories.
        </span>
      )
    }

    return (
      <ul>
        {this.props.categories.map((x, i) => <li key={i}><CategoryLink category={x}/></li>)}
      </ul>
    )
  }
}
