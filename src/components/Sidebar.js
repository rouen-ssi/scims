import React from 'react'
import SidebarCategories from './SidebarCategories'
import SidebarArchives from './SidebarArchives'

class Sidebar extends React.Component {

  render() {
    return (
      <div className="bloc sidebar">
        <SidebarCategories />
        <SidebarArchives />
      </div>
    )
  }

}

export default Sidebar
