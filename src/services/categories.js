/** @flow */

import { JsonService } from './json'

export type Category = {
  id: number,
  name: string,
  parent_categories: number,
  article_count: number,
}

export type FetchCategoriesResponse = {
  categories: Array<Category>,
}

export class CategoryService extends JsonService {
  fetchCategory(categoryId: number): Promise<Category> {
    return this.request('GET', `/category/${categoryId}`)
  }

  fetchAll(): Promise<FetchCategoriesResponse> {
    return this.request('GET', '/categories')
  }
}
