/** @flow */

import React from 'react'
import slugify from 'slug'

import { Link as BaseLink } from 'react-router'

import type { Category } from '../services/categories'
import type { Article } from '../services/articles'

export const Link = (props: {disabled?: boolean, children?: React$Element<*>}) => (
  props.disabled
  ? <span>{props.children}</span>
  : <BaseLink {...props}>{props.children}</BaseLink>
)

export const CategoryLink = (props: {category: Category, disabled?: boolean, children?: React$Element<*>}) => (
  <Link to={`/category/${props.category.id}/${slugify(props.category.name, {lower: true})}`} disabled={props.disabled}>
    {props.children || props.category.name}
  </Link>
)

export const ArticleLink = (props: {article: Article, disabled?: boolean}) => (
  <Link to={`/article/${props.article.id}/${slugify(props.article.title, {lower: true})}`} disabled={props.disabled}>
    {props.article.title}
  </Link>
)
