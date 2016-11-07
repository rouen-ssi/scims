import React from 'react'
import classNames from 'classnames'

const Sidebar = ({ children, side }) => {
  let classes = classNames('bloc', 'sidebar', side)
  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export default Sidebar
