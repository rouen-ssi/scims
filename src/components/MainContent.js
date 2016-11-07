import React from 'react'
import classNames from 'classnames'

const MainContent = ({ children, side }) => {
  let classes = classNames('main-content', side)
  return (
    <div className={classes}>
      { children }
    </div>
  )
}

export default MainContent
