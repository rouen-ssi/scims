import React from 'react'
import Sidebar from '../components/Sidebar'
import ArticleCategoryScreen from './ArticleCategoryScreen'
import ArticleArchives from '../components/ArticleArchives'
import ArticleList from '../containers/ArticleList'
import MainContent from '../components/MainContent'

const Home = () => (
  <div>
    <Sidebar side="right">
      <ArticleCategoryScreen />
      <ArticleArchives />
    </Sidebar>
    <MainContent side="left">
      <ArticleList/>
    </MainContent>
  </div>
)

export default Home
