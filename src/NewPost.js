import React from 'react'
import './index.css';
import {useNavigate} from 'react-router-dom';

import {useStoreState,useStoreActions} from 'easy-peasy';
const NewPost = () => {
  //const{posts,setPosts,postTitle,setPostTitle,postBody,setPostBody} = useContext(DataContext);
  {/**Get required states from store */}
  const posts = useStoreState((state)=>state.posts);
  const postBody = useStoreState((state)=>state.postBody);
  const postTitle = useStoreState((state)=>state.postTitle);
  const setPostTitle = useStoreActions((action)=>action.setPostTitle);
  const setPostBody = useStoreActions((action) => action.setPostBody);
  const savePost = useStoreActions((action) => action.savePost);

  const navigate = useNavigate();
  async function handleSubmit(e){
    e.preventDefault();
    //ensure new id is not a duplicate and is the next positive integer
    const id = posts.length? posts[posts.length-1].id + 1: 1;
    //const datetime = format(new Date, 'MMMM dd, yyyy pp');
    const datetime = new Date();
    //Create the new post
    const newPost = {id, title: postTitle, datetime, body: postBody};
    savePost(newPost);
    navigate('/');
    //Crud Operation (Submit)
    
  }

  return (

    <div className = 'newPost'>
      {/**Page to add a new post */}
        <h2>New Post</h2>
        <form className = 'newPostForm' onSubmit = {(e) => handleSubmit(e)}>
          
          <label htmlFor = 'title-box'>
            Title:
          </label>
          <input
            id = 'title-box'
            type = 'text'
            placeholder = 'Enter title here'
            value = {postTitle}
            onChange = {(e) => setPostTitle(e.target.value)}
            required
            autoFocus
          ></input>
          <textarea
            id = 'body-text'
            type = 'text'
            value = {postBody}
            placeholder = "Enter Text Here..."
            onChange = {(e) => setPostBody(e.target.value)}
            required
          >
          </textarea>
          <button type = 'submit'>Submit</button>
        </form>
    </div>
  )
}

export default NewPost;