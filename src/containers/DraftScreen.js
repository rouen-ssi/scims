/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import DayPicker from 'react-day-picker'
import { Editor, EditorState, ContentState } from 'draft-js'
import { Link } from 'react-router'
import { Icon } from '../components/icons/FontAwesome'

import type { User } from '../services/account'
import type { State } from '../reducers'

const loremContentState = ContentState.createFromText('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum quaerat illum incidunt odit voluptatem delectus. Rem aperiam, placeat dolor hic facilis quo! Sunt, deserunt quam excepturi placeat unde velit sequi!')

class TextInput extends React.Component {
  props: {
    value: string,
    placeholder: string,

    onChange?: (value: string) => void,
  }

  state = {
    value: this.props.value,
    focus: false,
  }

  refs: {
    input: HTMLInputElement,
  }

  render() {
    if (this.state.focus) {
      return <input ref="input" type="text" placeholder={this.props.placeholder} value={this.state.value} onBlur={this._onBlur} autoFocus onChange={this._onChange}/>
    }

    return <span onClick={this._onClick}>{this.props.value || this.props.placeholder}</span>
  }

  _onClick = (e: Event) => {
    e.preventDefault()

    this.setState({ focus: true }, () => {
      this.refs.input.selectionStart = this.state.value.length
    })

    return false
  }

  _onBlur = (e: Event) => {
    e.preventDefault()

    this.setState({ focus: false })

    if (this.props.onChange) {
      this.props.onChange(this.state.value)
    }

    return false
  }

  _onChange = (e: Event) => {
    e.preventDefault()

    if (e.target instanceof HTMLInputElement) {
      this.setState({ value: e.target.value })
    }

    return false
  }
}

class DateInput extends React.Component {
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
            style={{position: 'absolute', background: 'white'}}/>
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

  _onDayClick = (e: Event, value: string) => {
    this.setState({ value: moment(value) })
  }
}

class ContentInput extends React.Component {
  props: {
    value: EditorState,
    onChange: (_: EditorState) => void,
  }

  render() {
    return (
      <Editor
        editorState={this.props.value}
        onChange={this.props.onChange}/>
    )
  }
}

class DraftScreen extends React.Component {
  props: {
    currentUser: User,
  }

  state = {
    title: '',
    publication_date: '',
    content: EditorState.createWithContent(loremContentState),
  }

  render() {
    return (
      <article className='bloc draft'>
        <h2>
          <TextInput value={this.state.title} placeholder="Lorem ipsum dolor sit amet, consectetur adipisicing elit." onChange={this.onChange('title')}/>
        </h2>

        <div className='article-infos'>
          <ul>
            <li><Icon type="calendar"/> <DateInput value={this.state.publication_date} onChange={this.onChange('publication_date')}/></li>
            <li><Icon type="user"/> {this.props.currentUser.first_name} {this.props.currentUser.last_name}</li>
            <li><Link to='#'><Icon type="share"/> Share</Link></li>
          </ul>
        </div>

        <div className="article-body">
          <ContentInput value={this.state.content} onChange={this.onChange('content')}/>
        </div>
      </article>
    )
  }

  onChange<T>(fieldName: string): (_: T) => void {
    return (value) => {
      this.setState({ [fieldName]: value })
    }
  }
}

function mapStateToProps(state: State): any {
  return {
    currentUser: state.account.currentUser,
  }
}

function mapDispatchToProps(_dispatch: (_: any) => void): any {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DraftScreen)
