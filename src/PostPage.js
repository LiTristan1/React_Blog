import React from 'react'
import {useParams,Link} from 'react-router-dom';

import {useStoreState,useStoreActions} from 'easy-peasy';
import {useNavigate} from 'react-router-dom';
import api from './api/posts';
const PostPage = () => {
  
  const deletePost = useStoreActions((action)=> action.deletePost);
  const getPostById = useStoreState((state) => state.getPostById);
  const editTitle = useStoreState((state) => state.editTitle);
  const posts = useStoreState((state) => state.posts);
  const editBody = useStoreState((state) => state.editBody);
  const setEditTitle = useStoreActions((action) => action.setEditTitle);
  const setPosts = useStoreActions((action) => action.setPosts);
  const setEditBody= useStoreActions((action) => action.setEditBody);
  
  
  const{id} = useParams();
  if(!id){
    id = 1;
  }
  const post = getPostById(id);

  const navigate  = useNavigate();

  function handleDelete() {
    //Delete using method in global store 
    deletePost(id);
    navigate('/');
  }
 
 

  

  return (
    <div className = 'postPage'>
        <div className = 'post'>
          {/**Display information about the post and gives option to delete */}
            {post && 
                <>
                    <h2>{post.title}</h2>
                    <p className = 'postDate'>{post.datetime}</p>
                    <p className = 'postBody'>{posts.body}</p>
                    <button onClick = {() => handleDelete(post.id)}>Delete Post</button>
                    <Link to = {`/edit/${post.id}`}>Edit Post</Link>
                </>
            }
            {!post && 
              <>
                <h2>Post Not Found</h2>
                <p>...and the site just isnt the same without your ideas</p>
                <Link to = '/'>
                  Return to Home Page
                </Link>
              
              </>
            
            
            
            }
        </div>
    </div>
  )
}

export default PostPage;