/** @flow */
import React from 'react'
import deepDiff from 'deep-diff'

import MainContent from './MainContent'
import Sidebar from './Sidebar'
import { Spinner } from './Spinner'
import { ArticleList } from './ArticleList'
import { CategoryList } from './CategoryList'
import { ArchiveList } from './ArchiveList'
import { CategoryBreadcrumbs } from './CategoryBreadcrumbs'

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
        <h2>
          <CategoryBreadcrumbs
            category={this.props.category}
            categories={this.props.categories}
          />
        </h2>

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
