import React from 'react';
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {useStoreState,useStoreActions} from 'easy-peasy';
const EditPost = () => {
    const navigate = useNavigate();
    const{id} = useParams();
    const getPostById = useStoreActions((action) => action.getPostById);
    const post = getPostById(id);
    const setEditTitle = useStoreActions((action) => action.setEditTitle);
    const setEditBody = useStoreActions((action) => action.setEditBody);
    const editPost = useStoreActions((action) => action.editPost);
    
    const editTitle = useStoreState((state) => state.editTitle);
    const editBody = useStoreState((state) => state.editBody);

    async function handleEdit(id) {
        const datetime = "May 25th";
        
        const updatedPost = {id,title: editTitle, datetime, body: editBody};
        editPost(updatedPost);
        navigate('/');
      }

   useEffect(() => {
        if(post) {
            setEditTitle(post.title);
            setEditBody(post.body);

        }
   },[post,setEditTitle,setEditBody])
  return (
    <div className = 'newPost'>
        {editTitle &&
        <>
            <h2>Edit Post</h2>
            <form className = 'newPostForm' onSubmit = {(e) => e.preventDefault()}>
            
            <label htmlFor = 'title-box'>
                Title:
            </label>
            <input
                id = 'title-box'
                type = 'text'
                placeholder = 'Enter title here'
                value = {editTitle}
                onChange = {(e) => setEditTitle(e.target.value)}
                required
                autofocus
            ></input>
            <textarea
                id = 'body-text'
                type = 'text'
                value = {editBody}
                placeholder = "Enter Text Here..."
                onChange = {(e) => setEditBody(e.target.value)}
                required
            >
            </textarea>
            <button type = 'submit' onClick = {() => handleEdit(post.id)}>Submit</button>
            </form>
            </>
          }
    </div>
  )
}

export default EditPost;