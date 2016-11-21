/** @flow */
import type { Action } from '../actions/article'
import type { Article } from '../services/articles'

export type State = {
  articles: Array<Article>,
}

const initialState: State = {
  articles: [],
}

export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case '@ARTICLE/PUSH_ARTICLE':
      return {
        ...state,

        articles: state.articles.concat(action.article),
      }

    case '@ARTICLE/XPUSH_ARTICLE':
      return {
        ...state,

        articles: state.articles.concat(action.articles),
      }

    default:
      return state
  }
}
