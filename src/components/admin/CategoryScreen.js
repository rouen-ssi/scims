/** @flow */
import React from 'react'

import { Table } from './Table'

import type { Category } from '../../services/categories'

export class CategoryScreen extends React.Component {
  props: {
    categories: Array<Category>,
  }

  render() {
    return (
      <Table
        loading={false}
        items={this.props.categories}
        fields={{name: 'Name', parent_categories: 'Parent'}}
        createItem={() => Promise.resolve(void 0)}
        updateItem={() => Promise.resolve(void 0)}
        deleteItem={() => Promise.resolve(void 0)}
      />
    )
  }
}
