/** @flow */

import React from 'react'
import cx from 'classnames'

import { Dropdown } from '../Dropdown'
import { Icons as CategoryIcons } from '../icons/Categories'
import { Spinner } from '../Spinner'

import type { Category } from '../../services/categories'

export type Props = {
  value: number,
  placeholder: string,
  categories: Array<Category>,
  onChange: (value: number) => void,
  loadCategories: () => void,
}

export class CategoryInput extends React.Component {
  props: Props

  state = {
    active: false,
  }

  getCategory(): ?Category {
    return this.props.categories.find(x => x.id === this.props.value)
  }

  render() {
    const selectedCategory = this.getCategory()

    return (
      <span onClick={this._onClick}>
        <span>{selectedCategory ? selectedCategory.name : this.props.placeholder}</span>
        <Dropdown open={this.state.active} onClose={() => this.setState({ active: false })}>
          <ul>
            {this.props.categories.length <= 0 && <li><Spinner/></li>}
            {this.props.categories.map((category, i) => (
              <li key={i} className={cx({ selected: selectedCategory && category.id === selectedCategory.id })}>
                <a href="#" onClick={this._onSelect(category)}>
                  {CategoryIcons[category.name]}
                  <span>{category.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </Dropdown>
      </span>
    )
  }

  _onClick = (e: Event) => {
    e.preventDefault()

    this.setState({ active: !this.state.active }, () => {
      this.props.loadCategories()
    })

    return false
  }

  _onSelect = (selected: Category) => (e: Event) => {
    e.preventDefault()

    this.props.onChange(selected.id)

    return false
  }
}
