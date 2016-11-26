/** @flow */

import React from 'react'
import slugify from 'slug'

import { Link } from 'react-router'

import type { Category } from '../services/categories'
import type { Article } from '../services/articles'

export const CategoryLink = (props: {category: Category}) => (
  <Link to={`/category/${props.category.id}/${slugify(props.category.name, {lower: true})}`}>
    {props.category.name}
  </Link>
)

export const ArticleLink = (props: {article: Article}) => (
  <Link to={`/article/${props.article.id}/${slugify(props.article.title, {lower: true})}`}>
    {props.article.title}
  </Link>
)
