import React from 'react'
import Sidebar from './Sidebar'
import Article from './Article'

class Home extends React.Component {
  render() {
    return (
      <div>
        <Sidebar />
        <div className='content-wrap'>
          <Article />
          <Article />
        </div>
      </div>
    )
  }
}

export default Home
