import React from 'react'
import {Outlet,Link} from 'react-router-dom';
import './index.css';
const Layout = () => {
  return (
    <>
          <nav className = 'navbar'>
            <ul className = 'navbar-list'>
                <li className = 'item'>
                    <Link className ='link' to = '/'>Home</Link>
                </li>s
                <li className = 'item'>
                    <Link className = 'link' to = '/post'>New Post</Link>
                </li>
                <li className = 'item'>
                    <Link className = 'link' to ='/post/:id'>Post Page</Link>
                </li>
            </ul>
        </nav>
        <Outlet/>
    </>
  )
}

export default Layout;