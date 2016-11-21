/** @flow */
import React from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import MainContent from './MainContent'

import type { Category } from '../services/categories'
import type { Article } from '../services/articles'

const icons = {
  'Mathematics': 'book',
  'Statistics': 'line-chart',
  'Arithmetics': 'plus',
  'Chemistry': 'flask',
  'Physics': 'space-shuttle',
}

function TimeAgo({value}: {value: string}) {
  const dt = moment(value)

  return <span>{dt.fromNow()}</span>
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

function ArticleSpan({article}: {article: Article}) {
  return (
    <div style={{display: 'flex', flexDirection: 'row', marginBottom: '1em', alignItems: 'center'}}>
      <Link to={`/article/${article.id}/${article.title}`}>
        <i className="fa fa-newspaper-o" style={{fontSize: '1.7em'}}/>
      </Link>
      <div style={{marginLeft: '1em', lineHeight: '1.5em'}}>
        <strong style={{fontFamily: 'PT Serif', fontSize: '1.3em', whiteSpace: 'nowrap', textOverflow: 'ellipsis', width: '100%'}}>{article.title}</strong>
        <br/>
        by
        {' '}<a href={`mailto:${article.user.email}`}>{article.user.first_name} {article.user.last_name}</a>
        {' '}<TimeAgo value={article.publication_date}/>
        {' '}<i className="fa fa-level-up"/> 8
        {' '}<i className="fa fa-commenting-o"/> 101
      </div>
    </div>
  )
}

export class ArticleCategory extends React.Component {
  props: {
    category: Category,
    categories: Array<Category>,
    articles: Array<Article>,

    loadArticles: (categoryId: number) => void,
  }

  componentDidMount() {
    if (this.props.articles.length <= 0) {
      this.props.loadArticles(this.props.category.id)
    }
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
            {this.props.articles.map((x, i) => <li key={i}><ArticleSpan article={x}/></li>)}
          </ol>
        </div>
      </MainContent>
    )
  }
}
