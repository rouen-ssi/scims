/** @flow */
import slugify from 'slug'
import React from 'react'

import { Link } from 'react-router'
import { Spinner } from './Spinner'

import type { Category } from '../services/categories'

/**
 * Displays a navigable category name
 */
export const CategoryLink = (props: {category: Category}) => (
  <Link to={`/category/${props.category.id}/${slugify(props.category.name, {lower: true})}`}>{props.category.name}</Link>
)

/**
 * Displays an evolving list of categories
 */
export class CategoryList extends React.Component {
  props: {
    loading: boolean,
    categories: Array<Category>,
    lastError: ?Error,
    fetchCategories: () => void,
  };

  componentDidMount() {
    this.props.fetchCategories()
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

    const categories = this.props.categories.filter(x => x.parent_categories === -1)
    return (
      <ul>
        {categories.map((x, i) => <li key={i}><CategoryLink category={x}/></li>)}
      </ul>
    )
  }
}
