import React from 'react'
import Sidebar from './Sidebar'
import ArticleCategories from './ArticleCategories'
import ArticleArchives from './ArticleArchives'
import Article from './Article'
import MainContent from './MainContent'

const Home = () => (
  <div>
    <Sidebar side="right">
      <ArticleCategories />
      <ArticleArchives />
    </Sidebar>
    <MainContent side="left">
      <Article />
      <Article />
    </MainContent>
  </div>
)

export default Home
