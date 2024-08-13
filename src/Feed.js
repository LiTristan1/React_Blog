import React from 'react';
import Post from './Post';
const Feed = ({posts}) => {
  return (
    <>
      {/**Creates a post element for each post */}
        {posts.map((post) => (
            <Post key = {post.id} post = {post}></Post>
        ))}
    </>
  )
}

export default Feed