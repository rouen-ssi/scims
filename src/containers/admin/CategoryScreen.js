/** @flow */
import { connect } from 'react-redux'

import * as categoryActions from '../../actions/admin/category'
import { CategoryScreen } from '../../components/admin/CategoryScreen'
import type { State } from '../../reducers'
import type { Category } from '../../services/categories'

function mapStateToProps(state: State): Object {
  return {
    loading: state.categories.fetching,
    categories: state.categories.categories.valueSeq().toJS(),
  }
}

function mapDispatchToProps(dispatch: <T> (_: any) => T): Object {
  return {
    createCategory(category: Category) {
      return dispatch(categoryActions.requestCreation(category))
    },
    updateCategory(category: Category) {
      return dispatch(categoryActions.requestUpdate(category))
    },
    deleteCategory(category: Category) {
      return dispatch(categoryActions.requestDeletion(category))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen)
