/** @flow */
/* eslint-disable camelcase */
import { JsonService } from './json'

export type Article = {
  id: number,
  is_draft: boolean,
  user: {
    uid: number,
    email: string,
    first_name: string,
    last_name: string,
  },
  title: string,
  content: string,
  category_id: number,
  subcategory_id: number,
  publication_date: string,
  comments_count: number,
}

export type FetchResponse = {
  pagination: {
    current: number,
    count: number,
  },
  articles: Array<Article>,
}

export type FetchOneResponse = {
  article: Article,
}

export type ArticleError
  = 'INVALID_TITLE'
  | 'INVALID_CONTENT'

export type CreateResponse
  = { success: true, id: number }
  | { success: false, errors: Array<ArticleError> }

export type UpdateResponse
  = { success: true }
  | { success: false, errors: Array<ArticleError> }

export type DeleteResponse
  = { success: true }
  | { success: false, errors: Array<'ARTICLE_NOT_FOUND'> }

export class ArticleService extends JsonService {
  fetch(page?: number, category_id?: number): Promise<FetchResponse> {
    return this.request('GET', '/articles', { page, category_id })
  }

  fetchOne(articleId: number): Promise<FetchOneResponse> {
    return this.request('GET', `/article/${articleId}`)
  }

  create(article: Article): Promise<CreateResponse> {
    return this.request('POST', '/article', article)
  }

  update(articleId: number, article: $Shape<Article>): Promise<UpdateResponse> {
    return this.request('PUT', `/article/${articleId}`, article)
  }

  delete(articleId: number): Promise<DeleteResponse> {
    return this.request('DELETE', `/article/${articleId}`)
  }
}
