/** @flow */

import React from 'react'
import classNames from 'classnames'

type Props = {
  side?: 'left' | 'center',
  children?: React$Element<*>[] | React$Element<*>,
}

const MainContent = ({ children, side }: Props) => {
  let classes = classNames('main-content', side)
  return (
    <div className={classes}>
      { children }
    </div>
  )
}

export default MainContent
