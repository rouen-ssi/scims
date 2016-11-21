/** @flow */
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
  articles: Array<Article>,
}

export class ArticleService extends JsonService {
  fetch(page?: number, categoryId?: number): Promise<FetchResponse> {
    return this.request('GET', '/articles', { page, categoryId })
  }
}
