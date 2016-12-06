/** @flow */
import React from 'react'
import cx from 'classnames'
import deepDiff from 'deep-diff'

import MainContent from './MainContent'
import Sidebar from './Sidebar'
import { Spinner } from './Spinner'
import { Icon } from './icons/FontAwesome'
import { Icons as CategoryIcons } from './icons/Categories'
import { ArticleList } from './ArticleList'
import { CategoryList } from './CategoryList'
import { ArchiveList } from './ArchiveList'
import { Link, CategoryLink } from './Link'

import type { Category } from '../services/categories'
import type { Article } from '../services/articles'

type Props = {
  loadingCategory: boolean,
  loadingArticles: boolean,
  category: ?Category,
  categories: Array<Category>,
  articles: Array<Article>,
  pagination: {current: number, count: number, categoryId: ?number},

  loadCategories: () => void,
  loadCategory: () => void,
  loadArticles: (page: number) => void,
}

export class CategoryScreen extends React.Component {
  props: Props

  componentDidMount() {
    this.props.loadCategories()
    this.props.loadCategory()
    this.props.loadArticles(this.props.pagination.current || 1)
  }

  componentDidUpdate(prev: Props) {
    console.log('update', deepDiff(prev, this.props))
    if (!this.props.loadingCategory) {
      this.props.loadCategory()
    }

    if (!this.props.loadingArticles) {
      this.props.loadArticles(this.props.pagination.current || 1)
    }
  }

  render() {
    if (this.props.loadingCategory) {
      return <Spinner/>
    }

    return (
      <div>
        {this.renderHeader()}

        <Sidebar side="right">
          {this.renderSubcategories(this.props.category)}
          <ArchiveList/>
        </Sidebar>

        <MainContent side="left">
          {this.renderArticles()}
        </MainContent>
      </div>
    )
  }

  renderHeader() {
    const current = this.props.category
    const categs = []
    const breadcrumbs = []

    // compute category family tree
    let categ = current
    while (categ) {
      categs.push(categ)
      // $FlowFixMe: Property cannot be accessed on possibly null value
      categ = this.props.categories.find(x => x.id === categ.parent_categories)
    }

    // convert family tree into a displayable elements
    for (let i = 0; i < categs.length; i++) {
      const categ = categs[categs.length - i - 1]

      breadcrumbs.push(
        <li key={i * 2} className="separator">
          <Icon type="angle-double-right"/>
        </li>
      )
      breadcrumbs.push(
        <li key={i * 2 + 1} className={cx({active: current && categ.id === current.id})}>
          {CategoryIcons[categ.name]}
          {' '}<CategoryLink category={categ} disabled={!!current && categ.id === current.id}/>
        </li>
      )
    }

    return (
      <h2>
        <ul className="breadcrumbs">
          <li className={cx({active: !current})}>
            <Icon type="home"/>
            {' '}<Link to="/" disabled={!current}>Homepage</Link>
          </li>
          {breadcrumbs}
        </ul>
      </h2>
    )
  }

  renderSubcategories(category: ?Category) {
    let directChildren = this.props.categories

    if (category) {
      // $FlowFixMe
      directChildren = this.props.categories.filter(x => x.parent_categories === category.id)
    }

    return (
      <CategoryList
        loading={false}
        categories={directChildren}
        lastError={null}
      />
    )
  }

  renderArticles() {
    if (this.props.loadingArticles) {
      return <Spinner/>
    }

    return (
      <ArticleList
        loading={this.props.loadingArticles}
        articles={this.props.articles}
        pagination={this.props.pagination}
        loadArticles={this.props.loadArticles}
      />
    )
  }
}
