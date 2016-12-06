/** @flow */

import React from 'react'

import { Icon } from './icons/FontAwesome'
import { Icons as CategoryIcons } from './icons/Categories'
import { Link, CategoryLink, ArticleLink } from './Link'
import { Breadcrumbs } from './Breadcrumbs'

import type { Category } from '../services/categories'
import type { Article } from '../services/articles'

export type Props = {
  category: ?Category,
  categories: Array<Category>,

  article?: Article,
}

export const CategoryBreadcrumbs = (props: Props) => {
  return (
    <Breadcrumbs
      items={compputeBreadcrumbItems(props)}
      renderRoot={renderRoot}
      renderItem={renderItem}
    />
  )
}

type BreadcrumbItem
  = { type: 'category', category: Category }
  | { type: 'article', article: Article }

function compputeBreadcrumbItems(props: Props) {
  const items: Array<BreadcrumbItem> = []

  let category = props.category
  while (category) {
    items.splice(0, 0, { type: 'category', category })
    // $FlowFixMe
    category = props.categories.find(x => x.id === category.parent_categories)
  }

  if (props.article) {
    items.push({ type: 'article', article: props.article })
  }

  return items
}

function renderRoot(disabled: boolean) {
  return (
    <span>
      <Icon type="home"/>
      {' '}<Link to="/" disabled={disabled}>Homepage</Link>
    </span>
  )
}

function renderItem(item: BreadcrumbItem, disabled: boolean) {
  switch (item.type) {
    case 'category':
      return (
        <span>
          {CategoryIcons[item.category.name]}
          {' '}<CategoryLink category={item.category} disabled={disabled}/>
        </span>
      )

    case 'article':
      return (
        <span>
          <ArticleLink article={item.article} disabled={disabled}/>
        </span>
      )
  }
}
