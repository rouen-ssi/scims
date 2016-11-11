/** @flow */
import React from 'react'
import { Link } from 'react-router'
import MainContent from './MainContent'

import type { Category } from '../services/categories'

const icons = {
  'Mathematics': 'book',
  'Statistics': 'line-chart',
  'Arithmetics': 'plus',
  'Chemistry': 'flask',
  'Physics': 'space-shuttle',
}

function Card(props: {category: Category}) {
  return (
    <Link to={`/category/${props.category.id}/${props.category.name}`} className="article-category-card">
      <span className="name">
        <i className={`fa fa-${icons[props.category.name]}`}/>
        <span>{props.category.name}</span>
      </span>

      <span className="stat">
        {props.category.article_count} articles
      </span>
    </Link>
  )
}

export class ArticleCategory extends React.Component {
  props: {
    category: Category,
    categories: Array<Category>,
  }

  render() {
    const directChildren = this.props.categories.filter(x => x.parent_categories === this.props.category.id)

    return (
      <MainContent side="center">
        <div className="bloc">
          <h1>
            <i className={`fa fa-${icons[this.props.category.name]}`}/>
            {this.props.category.name}
          </h1>

          <h3>Sub-categories</h3>

          <section className="article-category-cards">
            {directChildren.map((x, i) => <Card key={i} category={x}/>)}
          </section>

          <h3>Trending Articles</h3>

          <ol>
            <li>Hello, World!</li>
            <li>Hello, World!</li>
            <li>Hello, World!</li>
            <li>Hello, World!</li>
            <li>Hello, World!</li>
            <li>Hello, World!</li>
          </ol>
        </div>
      </MainContent>
    )
  }
}
