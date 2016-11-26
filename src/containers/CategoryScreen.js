/** @flow */
import { connect } from 'react-redux'
import type { State } from '../reducers'
import * as categoryActions from '../actions/category'

import { CategoryScreen } from '../components/CategoryScreen'

type Props = {
  routeParams: {
    categoryId: string,
  },
}

function mapStateToProps(state: State, props: Props): Object {
  const categoryId = parseInt(props.routeParams.categoryId, 10)
  const category = state.categories.categories.get(categoryId)
  const articles = state.categories.articles.get(categoryId, [])

  return {
    category,
    categories: state.categories.categories.valueSeq().toJS(),
    articles,
  }
}

function mapDispatchToProps(dispatch: (action: any) => void, props: Props): Object {
  return {
    loadCategory() {
      dispatch(categoryActions.fetchAll())
      dispatch(categoryActions.fetchCategory(parseInt(props.routeParams.categoryId, 10)))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen)
