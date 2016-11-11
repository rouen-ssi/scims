import React from 'react'
import Sidebar from '../components/Sidebar'
import ArticleCategories from '../components/ArticleCategories'
import ArticleArchives from '../components/ArticleArchives'
import Article from '../components/Article'
import MainContent from '../components/MainContent'

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
