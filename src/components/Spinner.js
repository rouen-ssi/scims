/** @flow */

import React from 'react'
import cx from 'classnames'

type FontAwesomeLarger = 2 | 3 | 4 | 5

type Props = {
  pulse?: boolean,
  size?: FontAwesomeLarger,
}

const defaultProps: Props = {
  pulse: true,
  size: 3,
}

export const Spinner = (props: Props = defaultProps) => (
  <i className={cx('fa', 'fa-spinner', 'fa-fw', props.pulse ? 'fa-pulse' : 'fa-spin', `fa-${props.size || 3}x`)}/>
)
