import React from 'react'
import {useEffect} from 'react';
import {useStoreState,useStoreActions} from 'easy-peasy';
import './index.css';
const Nav = () => {
  const posts = useStoreState((state) => state.posts);
  const search = useStoreState((state) => state.posts);
  const setSearch = useStoreActions((action) => action.setSearch);
  const setSearchResults = useStoreActions((action) => action.setSearchResults);

  useEffect(() => {
    //Ensures all posts displayed in feed contains the searched words
    const filteredResults = posts.filter((post) => ((post.body).toLowerCase()).includes(search.toLowerCase()) || ((post.title).toLowerCase()).includes(search.toLowerCase()));
    setSearchResults(filteredResults.reverse());
    console.log("search changed");
    console.log(search);
    console.log(filteredResults);
},[posts,search,setSearchResults])

  return (
    
   <nav>
      {/**Allows user to search by post body content */}
        <form className = 'searchForm' onSubmit = {(e) => e.preventDefault()}>
            <label htmlFor = "search">Search Posts</label>
            <input
                id = "search"
                type = "text"
                placeholder = "Search Posts"
                value = {search}
                onChange = {(e) => setSearch(e.target.value)}
            >
            </input>
        </form>
   </nav>
  )
}

export default Nav;