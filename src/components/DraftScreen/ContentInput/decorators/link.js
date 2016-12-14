/** @flow */

import React from 'react'

import type { Decorator as DecoratorType } from 'draft-js'

class Component extends React.Component {
  render() {
    return null
  }
}

export const Link: DecoratorType = {
  strategy: (_block, _callback) => {
  },
  component: Component,
}
