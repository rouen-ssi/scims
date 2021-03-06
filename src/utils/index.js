/** @flow */

export { default as deepEqual } from './deepEqual'

export function truncateText(text: string, length: number): string {
  if (text.length <= length) {
    return text
  }

  return text.substring(0, length) + ' …'
}

export function wrapPreventDefault(fun?: () => any): (e: Event) => boolean {
  return e => {
    e.preventDefault()
    fun && fun()
    return false
  }
}

export function maybeArray<T>(xs: Array<T>|T): Array<T> {
  /* eslint-disable no-proto */
  // $FlowFixMe
  if (xs.__proto__ === Array.prototype) {
    // $FlowFixMe
    return xs
  }
  // $FlowFixMe
  return [xs]
  /* eslint-enable no-proto */
}

export function removeWhen<T>(xs: Array<T>, pred: (_: T) => boolean): Array<T> {
  const result = xs.concat()

  while (true) {
    const idx = result.findIndex(pred)
    if (idx < 0) {
      break
    }

    result.splice(idx, 1)
  }

  return result
}
