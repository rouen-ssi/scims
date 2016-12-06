/** @flow */
import React from 'react'

import MainContent from './MainContent'
import Sidebar from './Sidebar'
import { ArchiveList } from './ArchiveList'

import CategoryList from '../containers/CategoryList'
import ArticleList from '../containers/ArticleList'

export const Home = () => (
  <div>
    <Sidebar side="right">
      <CategoryList />
      <ArchiveList />
    </Sidebar>
    <MainContent side="left">
      <ArticleList/>
    </MainContent>
  </div>
)
