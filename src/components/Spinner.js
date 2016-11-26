/** @flow */

import React from 'react'
import { Icon } from './icons/FontAwesome'

export const Spinner = (props: {small?: boolean}) => (
  <Icon type="spinner" size={!props.small ? '3x' : undefined} animation="spin"/>
)
