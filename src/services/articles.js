/** @flow */
/* eslint-disable camelcase */
import { JsonService } from './json'

export type Article = {
  id: number,
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

export class ArticleService extends JsonService {
  fetch(page?: number, category_id?: number): Promise<FetchResponse> {
    return this.request('GET', '/articles', { page, category_id })
  }

  fetchOne(articleId: number): Promise<FetchOneResponse> {
    return this.request('GET', `/article/${articleId}`)
  }
}
