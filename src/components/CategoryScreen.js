/** @flow */
import React from 'react'
import { Link } from 'react-router'

import MainContent from './MainContent'
import { TimeAgo } from './DateTime'
import { ArticleLink } from './Link'
import { Spinner } from './Spinner'
import { Icon } from './icons/FontAwesome'
import { Icons as CategoryIcons } from './icons/Categories'

import type { Category } from '../services/categories'
import type { Article } from '../services/articles'

function Card(props: {category: Category}) {
  return (
    <Link to={`/category/${props.category.id}/${props.category.name}`} className="article-category-card">
      <span className="name">
        {CategoryIcons[props.category.name]}
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
    <span className="category-article-list-element">
      <span className="name"><ArticleLink article={article}/></span>
      <br/>
      <span className="details">
        <span className="author">by <a href={`mailto:${article.user.email}`}>{article.user.first_name} {article.user.last_name}</a></span>
        <TimeAgo value={article.publication_date} className="publication_date"/>
        <span className="popularity"><Icon type="level-up" fixed/> 8</span>
        <span className="comments"><Icon type="comments" fixed/> 101</span>
      </span>
    </span>
  )
}

type Props = {
  loading: boolean,
  category: ?Category,
  categories: Array<Category>,
  articles: Array<Article>,

  loadCategories: () => void,
  loadCategory: () => void,
}

export class CategoryScreen extends React.Component {
  props: Props

  componentDidMount() {
    this.props.loadCategories()
    this.props.loadCategory()
  }

  componentDidUpdate() {
    if (!this.props.loading) {
      this.props.loadCategory()
    }
  }

  render() {
    if (this.props.loading) {
      return <Spinner/>
    }

    const { category } = this.props

    if (!category) {
      return (
        <MainContent side="left">
          <div className="bloc">
            <h2>Category not found</h2>
          </div>
        </MainContent>
      )
    }

    return (
      <MainContent side="center">
        <div className="bloc">
          <h1>
            {CategoryIcons[category.name]}
            {' '}{category.name}
          </h1>

          {this.renderSubcategories(category)}
          {this.renderArticles()}
        </div>
      </MainContent>
    )
  }

  renderSubcategories(category: Category) {
    const directChildren = this.props.categories.filter(x => x.parent_categories === category.id)

    if (directChildren.length <= 0) {
      return null
    }

    return (
      <div>
        <h3 style={{margin: 0}}>Sub-categories</h3>

        <section className="article-category-cards" style={{marginBottom: '1em'}}>
          {directChildren.map((x, i) => <Card key={i} category={x}/>)}
        </section>
      </div>
    )
  }

  renderArticles() {
    return (
      <div>
        <h3>Trending Articles</h3>

        <ol className="category-article-list">
          {this.props.articles.map((x, i) => <li key={i}><ArticleSpan article={x}/></li>)}
        </ol>
      </div>
    )
  }
}
