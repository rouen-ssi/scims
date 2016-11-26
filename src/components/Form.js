/** @flow */

import React from 'react'
import cx from 'classnames'

import { Spinner } from './Spinner'
import { Icon } from './icons/FontAwesome'

export function HtmlInput({type = 'text', ...props}: Object) {
  return <input type={type} {...props}/>
}

export function Field({label, id, Widget = HtmlInput, errors = [], ...props}: Object) {
  return (
    <tr className={cx('form-field', {'form-field-error': errors.length > 0})}>
      <td><label htmlFor={id}>{label}</label></td>
      <td>
        <Widget id={id} placeholder={label} {...props}/>
        <ul className="form-field-errors">
          <Icon type="exclamation-triangle"/>
          {errors.map((error, i) => <li key={i}>{error}</li>)}
        </ul>
      </td>
    </tr>
  )
}

export function Form({children, ...props}: Object) {
  return (
    <form className="form" {...props}>
      <table>
        <tbody>{children}</tbody>
      </table>
    </form>
  )
}

export function Button({children, loading, ...props}: Object) {
  return (
    <tr className="form-action">
      <td/>
      <td>
        <button {...props}>
          {loading ? <Spinner small/> : children}
        </button>
      </td>
    </tr>
  )
}

export class Component extends React.Component {
  static errors: { [message: string]: [string, string] };
  props: { errors: Array<string> };
  state: { form: { [id: string]: ?string } };

  constructor(props: Object, context: mixed) {
    super(props, context)

    this.state = { form: {} }
  }

  renderField(id: string, label: string, props: Object = {}) {
    const errors = []
    for (const error of this.props.errors || []) {
      const errorMeta = this.constructor.errors[error]
      if (errorMeta) {
        const [errorField, errorMessage] = errorMeta
        if (errorField !== id) {
          continue
        }
        errors.push(errorMessage)
      }
    }

    return <Field id={id} label={label} {...props} onChange={this._onFieldChange} value={this.state.form[id] || ''} errors={errors}/>
  }

  _onFieldChange = (e: Event) => {
    e.preventDefault()

    if (e.target instanceof HTMLInputElement) { // eslint-disable-line no-undef
      this.setState({
        form: {
          ...this.state.form,
          [e.target.id]: e.target.value,
        },
      })
    }

    return false
  }

  onSubmit(_formData: Object) {

  }

  _onSubmit = (e: Event) => {
    e.preventDefault()

    this.onSubmit(this.state.form)

    return false
  }
}
