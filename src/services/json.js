/** @flow */

import { stringify as querystring } from 'querystring'

export type HttpMethod = 'HEAD' | 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'TRACE'
export type HttpParams = {[key: string]: any}
export type HttpHeaders = {[key: string]: string}

/**
 * @author Antoine Chauvin <antoine.chauvin@etu.univ-rouen.fr>
 */
export class JsonService {
  baseURL: string;
  token: ?string;

  constructor(baseURL: string, token?: ?string) {
    this.baseURL = baseURL
    this.token = token
  }

  /**
   * Perform an HTTP request to a remote REST service
   */
  async request<T: Object>(method: HttpMethod, url: string, params?: HttpParams, headers?: HttpHeaders): Promise<T & {success: boolean}> {
    const body: ?string = method !== 'GET' ? JSON.stringify(params || {}) : undefined
    const query: string = method === 'GET' ? '?' + querystring(params || {}) : ''

    const res = await window.fetch(this.baseURL + url + query, {
      method,
      headers: {
        ...headers,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    })

    if (res.status >= 500 || res.status === 401) {
      throw new Error(res.statusText)
    }

    const text = await res.text()
    if (text.length === 0 && res.status === 200) {
      // $FlowFixMe
      return {success: true}
    }

    const respBody = JSON.parse(text)
    return {...respBody, success: !respBody.errors}
  }

  /**
   * Perform an authenticated HTTP request to a remote REST service
   */
  authRequest<T>(method: HttpMethod, path: string, params?: HttpParams = {}, headers?: HttpHeaders): Promise<T> {
    if (this.token) {
      return this.request(method, path, params, { ...headers, 'Authorization': `Bearer ${this.token}` })
    }
    return this.request(method, path, params, headers)
  }
}
