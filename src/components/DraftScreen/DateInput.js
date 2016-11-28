/** @flow */

import React from 'react'
import moment from 'moment'

import DayPicker from 'react-day-picker'

export class DateInput extends React.Component {
  props: {
    value: string,

    onChange: (value: string) => void,
  }

  state = {
    value: moment(this.props.value || undefined),
    focus: false,
  }

  refs: {
    widget: HTMLSpanElement,
    picker: DayPicker,
  }

  render() {
    if (this.state.focus) {
      return (
        <span ref="widget">
          <span onClick={this._onClick}>{this.state.value.format('ll')}</span>
          <DayPicker
            ref="picker"
            fixedWeeks
            onDayClick={this._onDayClick}
            selectedDays={day => moment(day).format('ll') === this.state.value.format('ll')}
            style={{position: 'absolute', background: 'white', zIndex: 2, boxShadow: '0px 10px 15px 2px rgba(0, 0, 0, 0.3)'}}/>
        </span>
      )
    }

    return <span onClick={this._onClick}>{this.state.value.format('ll')}</span>
  }

  _onClick = (e: Event) => {
    e.preventDefault()

    this.setState({ focus: true })

    return false
  }

  componentDidUpdate() {
    if (this.state.focus) {
      document.addEventListener('click', this._handleDocumentClick)
    } else {
      document.removeEventListener('click', this._handleDocumentClick)
    }
  }

  _handleDocumentClick = (e: MouseEvent) => {
    if (!this.refs.picker.dayPicker.contains(e.target)) {
      this.setState({ focus: false })
    }
  }

  _onDayClick = (e: Event, value: Date) => {
    this.setState({ value: moment(value) })
    this.props.onChange(moment(value).toISOString())
  }
}
