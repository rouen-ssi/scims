/** @flow */
import React from 'react'

import type { Category } from '../../services/categories'

export class CategoryScreen extends React.Component {
  props: {
    categories: Array<Category>,
  }

  render() {
    return <span>{this.props.categories.length}</span>
  }
}
