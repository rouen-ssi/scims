import React from 'react'

class SidebarCategories extends React.Component {
  render() {
    return (
      <div className='sidebar-bloc'>
        <h1>Categories</h1>
        <ul>
          <li><a href="#">Mathematics</a></li>
          <li><a href="#">Physic</a></li>
          <li><a href="#">Computer Science</a></li>
          <li><a href="#">Biology</a></li>
        </ul>
      </div>
    )
  }
}

export default SidebarCategories
