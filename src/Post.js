import React from 'react';
import {Outlet,Link} from 'react-router-dom';
import './index.css';
const Post = ({post}) => {
  function setActive(){
    const postPage = document.getElementById('postPage');
    postPage.className += "Active";
  }
  return (
    <div className = 'Post'>
        <Link onClick = {() => setActive()} className = 'postLink' to = {`/post/${post.id}`}>
            <h2>{post.title}</h2>
            <p className = 'postDate'>{post.datetime}</p>
        </Link>
        <Outlet/>
        <p className = 'postBody'>
            {/**Gives short preview (max 25 words) for the post */}
            {(post.body).length <= 25 ? post.body: `${(post.body).slice(0,25)}...`}
        
        </p>
        <div className = 'seperater'></div>
        
    </div>
  )
}

export default Post;