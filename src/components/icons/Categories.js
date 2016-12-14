/** @flow */
import React from 'react'

import { Icon } from './FontAwesome'

export const Icons: {[categoryName: string]: React$Element<*>} = {
  'Mathematics': <Icon type="book"/>,
  'Statistics': <Icon type="line-chart"/>,
  'Arithmetics': <Icon type="plus"/>,
  'Chemistry': <Icon type="flask"/>,
  'Physics': <Icon type="space-shuttle"/>,
}
