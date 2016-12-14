/** @flow */

import { CompositeDecorator } from 'draft-js'

import { Link } from './link'

export default new CompositeDecorator([
  Link,
])
