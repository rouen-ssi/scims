/** @flow */
import React from 'react'

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

  loadArticles: (page: number) => void,
}

export class CategoryScreen extends React.Component {
  props: Props

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
    const categoryId = category ? category.id : -1
    const directChildren = this.props.categories.filter(x => x.parent_categories === categoryId)

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
