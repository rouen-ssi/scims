import React from 'react'
import moment from 'moment'

export const DateTime = ({value}: {value: string}) => {
  const dt = moment(value)
  return <span>{dt.format('ll')}</span>
}
