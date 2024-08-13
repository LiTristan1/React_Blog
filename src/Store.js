import {createStore,action,thunk,computed} from 'easy-peasy';
import api from './api/posts';
//global store manager that defines all states and state manipulator methods
export default createStore({
    posts: [],
    setPosts: action((state,payload) => {
        state.posts = payload;
    }),
    postTitle: '',
    setPostTitle: action((state,payload) => {
        state.postTitle = payload;
    }),
    postBody: '',
    setPostBody: action((state,payload) => {
        state.postBody = payload;
    }),
    editTitle: '',
    setEditTitle: action((state,payload) => {
        state.editTitle = payload;
    }),
    editBody: '',
    setEditBody: action((state,payload) => {
        state.editBody = payload
    }),
    search: '',
    setSearch: action((state,payload) => {
        state.search = payload;
    }),
    searchResults: [],
    setSearchResults: action((state,payload) => {
        state.searchResults = payload;
    }),

    postCount: computed((state) => state.posts.length),
    getPostById: computed((state)=> {
        return(id) => state.posts.find((post) => post.id.toString() === id);
    }),
    //method to save post
    savePost: thunk(async(actions,newPost,helpers) => {
        const {posts} = helpers.getState();
        try{
            const response = await api.post('/posts',newPost)
            const newPostList = [...posts,response.data];
            actions.setPosts(newPostList);
            actions.setPostTitle('');
            actions.setPostBody('');
            //Can not call hooks in store.js
          }catch(error){
            console.log(error.message);
          }
        }),
        //method to delete post
        deletePost: thunk(async(actions,id,helpers)=>{
            const{posts} = helpers.getState();
            try{
                await api.delete(`/posts/${id}`);
                const handled = posts.filter((post) => post.id !== id);
                actions.setPosts(handled);
              }catch(error){
          
              }
        }),
        //method to edit post
        editPost: thunk(async(actions,updatedPost,helpers) => {
            const{posts} = helpers.getState();
            const{id} = updatedPost;
            try{
                const response = await api.put(`/posts/${id}`,updatedPost);
                //Could use updated post instead of ...response.data
                actions.setPosts(posts.map(post => (post.id === id ? {...response.data}: post)))
                actions.setEditTitle("");
                actions.setEditBody("");
              }catch(error){
                console.log(error.message)
              }
        })
})