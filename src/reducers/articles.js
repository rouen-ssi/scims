/** @flow */
import type { Action } from '../actions/article'
import type { Article } from '../services/articles'

export type ArticleByPage = {[page: number]: Array<Article>}
export type ArticleByCategory = {[categoryId: number]: ArticleByPage}

export type State = {
  currentPage: number,
  pageCount: number,
  articles: ArticleByCategory,
}

const initialState: State = {
  articles: {},
  currentPage: 1,
  pageCount: 1,
}

export type Lens<T, R> = {
  get: (instance: T) => R,
  set: (instance: T, param: R) => T,
}

function lens<T, R>(get: (instance: T) => R, set: (instance: T, param: R) => T): Lens<T, R> {
  return { get, set }
}

function andThen<T1, T2, R>(first: Lens<T1, T2>, second: Lens<T2, R>): Lens<T1, R> {
  return lens(
    (instance: T1) => second.get(first.get(instance)),
    (instance: T1, param: R) => first.set(instance, second.set(first.get(instance), param)),
  )
}

function andThen2<P1: Object, T1, P2: Object, T2, R>(first: (p: P1) => Lens<T1, T2>, second: (p: P2) => Lens<T2, R>): (p: P1 & P2) => Lens<T1, R> {
  return (p) => andThen(first(p), second(p))
}

export function articlesByCategory({categoryId}: {categoryId: number}): Lens<State, ArticleByPage> {
  return lens(
    (state) => state.articles[categoryId] || {},
    (state, pages) => ({
      ...state,
      articles: {
        ...state.articles,
        [categoryId]: pages,
      },
    })
  )
}

export function pushArticles({page}: {page: number}): Lens<ArticleByPage, Array<Article>> {
  return lens(
    (pages) => pages[page],
    (pages, articles) => ({
      ...pages,
      [page]: (pages[page] || []).concat(articles),
    })
  )
}

export const test: (_: {page: number, categoryId: number}) => Lens<State, Array<Article>> =
  andThen2(articlesByCategory, pushArticles)

export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case '@ARTICLE/NEXT_PAGE':
      return { ...state, currentPage: state.currentPage + 1 }

    case '@ARTICLE/PREVIOUS_PAGE':
      return { ...state, currentPage: Math.max(0, state.currentPage - 1) }

    case '@ARTICLE/PUSH_ARTICLE':
      return test({
        page: state.currentPage,
        categoryId: action.article.category_id,
      }).set(state, [action.article])

    case '@ARTICLE/XPUSH_ARTICLE':
      const newState = test({
        page: action.page || state.currentPage,
        categoryId: action.categoryId || -1,
      }).set(state, action.articles)

      return { ...newState, pageCount: action.pageCount }

    default:
      return state
  }
}
