/** @flow */
import React from 'react'

import Sidebar from './Sidebar'
import ArticleArchives from './ArticleArchives'
import MainContent from './MainContent'

import CategoryList from '../containers/CategoryList'
import ArticleList from '../containers/ArticleList'

export const Home = () => (
  <div>
    <Sidebar side="right">
      <CategoryList />
      <ArticleArchives />
    </Sidebar>
    <MainContent side="left">
      <ArticleList/>
    </MainContent>
  </div>
)
