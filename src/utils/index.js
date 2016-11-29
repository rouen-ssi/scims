/** @flow */

export { default as deepEqual } from './deepEqual'

export function truncateText(text: string, length: number): string {
  if (text.length <= length) {
    return text
  }

  return text.substring(0, length) + ' …'
}

export function wrapPreventDefault(fun: () => any): (e: Event) => boolean {
  return e => {
    e.preventDefault()
    fun()
    return false
  }
}
