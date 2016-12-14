/** @flow */
import React from 'react'
import cx from 'classnames'

import { Icon } from './icons/FontAwesome'

export type Props<T> = {
  items: Array<T>,
  renderRoot: (current: boolean) => ?React$Element<*>,
  renderItem: (item: T, current: boolean) => ?React$Element<*>,
}

export function Breadcrumbs<T>(props: Props<T>) {
  const breadcrumbs = []

  for (let i = 0; i < props.items.length; i++) {
    const item = props.items[i]
    const current = i === (props.items.length - 1)

    breadcrumbs.push(
      <li key={i * 2} className="separator">
        <Icon type="angle-double-right"/>
      </li>
    )
    breadcrumbs.push(
      <li key={i * 2 + 1} className={cx({ current })}>
        {props.renderItem(item, current)}
      </li>
    )
  }

  return (
    <ul className="breadcrumbs">
      <li key="root" className={cx({ current: breadcrumbs.length <= 0 })}>
        {props.renderRoot(breadcrumbs.length <= 0)}
      </li>
      {breadcrumbs}
    </ul>
  )
}
