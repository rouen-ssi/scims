/** @flow */
import { connect } from 'react-redux'

import { CategoryScreen } from '../../components/admin/CategoryScreen'
import type { State } from '../../reducers'

function mapStateToProps(state: State): Object {
  return {
    categories: state.categories.categories.valueSeq().toJS(),
  }
}

export default connect(mapStateToProps)(CategoryScreen)
