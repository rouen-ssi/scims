/** @flow */
import React from 'react'
import moment from 'moment'
import { Link } from 'react-router'
import type { Article as ArticleType } from '../services/articles'

const DateTime = ({value}: {value: string}) => {
  const dt = moment(value)
  return <span>{dt.format('ll')}</span>
}

export const Article = (props: {article: ArticleType}) => (
  <article className='bloc article'>
    <h1>{props.article.title}</h1>

    <div className='article-infos'>
      <ul>
        <li><i className='fa fa-calendar'></i> <DateTime value={props.article.publication_date}/></li>
        <li><i className='fa fa-user'></i> {props.article.user.first_name} {props.article.user.last_name}</li>
        <li><Link to='#'><i className='fa fa-share'></i>Share</Link></li>
      </ul>
    </div>

    <div className="article-body">
      {props.article.content}
    </div>
  </article>
)
