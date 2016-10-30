import React from 'react'
import { Link } from 'react-router'

const Article = () => (
  <article className='bloc article'>
    <h1>Lorem ipsum di amet super-title</h1>

    <div className='article-infos'>
      <ul>
        <li><i className='fa fa-calendar'></i> 20/10/2016</li>
        <li><i className='fa fa-user'></i> Mathieu</li>
        <li><Link to='#'><i className='fa fa-share'></i>Share</Link></li>
      </ul>
    </div>

    <h2>The standart ipsum</h2>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
    non proident, sunt in culpa qui officia deserunt mollit anim id est
    laborum.</p>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commod
     consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
     cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
     non proident, sunt in culpa qui officia deserunt mollit anim id est
     laborum.</p>
  </article>
)

export default Article
