/** @flow */
import slugify from 'slugify'
import React from 'react'

import { Link } from 'react-router'
import { Spinner } from './Spinner'

import type { Category } from '../services/categories'

/**
 * Displays a navigable category name
 */
export const ArticleCategory = (props: {category: Category}) => (
  <Link to={`/category/${props.category.id}/${slugify(props.category.name)}`}>{props.category.name}</Link>
)

/**
 * Displays a navigable list of category.
 */
export const ArticleCategoryList = (props: {categories: Array<Category>}) => (
  <ul>
    {props.categories.map((x, i) => <li key={i}><ArticleCategory category={x}/></li>)}
  </ul>
)

/**
 * Displays an evolving list of categories
 */
export class ArticleCategories extends React.Component {
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
    let screen

    if (this.props.loading) {
      screen = <Spinner/>
    } else if (this.props.lastError) {
      screen = <em>{this.props.lastError.message}</em>
    } else {
      screen = <ArticleCategoryList categories={this.props.categories.filter(x => x.parent_categories === -1)}/>
    }

    return (
      <div className="sidebar-bloc">
        <h1>Categories</h1>
        {screen}
      </div>
    )
  }
}
