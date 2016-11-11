import React from 'react'
import Sidebar from '../components/Sidebar'
import ArticleCategoryScreen from './ArticleCategoryScreen'
import ArticleArchives from '../components/ArticleArchives'
import Article from '../components/Article'
import MainContent from '../components/MainContent'

const Home = () => (
  <div>
    <Sidebar side="right">
      <ArticleCategoryScreen />
      <ArticleArchives />
    </Sidebar>
    <MainContent side="left">
      <Article />
      <Article />
    </MainContent>
  </div>
)

export default Home
