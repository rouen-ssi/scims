/** @flow */
import React from 'react'

import { Link } from 'react-router'
import { DateTime } from './DateTime'
import { ArticleLink } from './Link'
import { Icon } from './icons/FontAwesome'

import type { Article as ArticleType } from '../services/articles'

function truncateText(text: string, length: number): string {
  if (text.length <= length) {
    return text
  }

  return text.substring(0, length) + ' …'
}

export const Article = (props: {article: ArticleType}) => (
  <article className='bloc article'>
    <h2>
      <ArticleLink article={props.article}/>
    </h2>

    <div className='article-infos'>
      <ul>
        <li><Icon type="calendar"/> <DateTime value={props.article.publication_date}/></li>
        <li><Icon type="user"/> {props.article.user.first_name} {props.article.user.last_name}</li>
        <li><Icon type="comments"/> {props.article.comments_count}</li>
        <li><Link to='#'><Icon type="share"/> Share</Link></li>
      </ul>
    </div>

    <div className="article-body">
      {truncateText(props.article.content, 500)}
    </div>
  </article>
)
