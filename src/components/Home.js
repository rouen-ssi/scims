import React from 'react'
import Sidebar from './Sidebar'
import Article from './Article'

const Home = () => (
  <div>
    <Sidebar />
    <div className='content-wrap'>
      <Article />
      <Article />
    </div>
  </div>
)

export default Home
