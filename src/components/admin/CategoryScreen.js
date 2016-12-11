/** @flow */
import React from 'react'

import { Table } from './Table'

import type { Category } from '../../services/categories'

export class CategoryScreen extends React.Component {
  props: {
    loading: boolean,
    categories: Array<Category>,

    createCategory: (category: Category) => Promise<*>,
    updateCategory: (category: Category) => Promise<*>,
    deleteCategory: (category: Category) => Promise<*>,
  }

  render() {
    return (
      <Table
        loading={this.props.loading}
        items={this.props.categories}
        fields={{id: 'ID', name: 'Name', parent_categories: 'Parent'}}
        createItem={this.props.createCategory}
        updateItem={this.props.updateCategory}
        deleteItem={this.props.deleteCategory}
      />
    )
  }
}
