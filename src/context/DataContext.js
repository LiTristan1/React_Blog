import {createContext, useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route,useNavigate} from 'react-router-dom';
import format from 'date-fns';
import api from  '../api/posts';
import useWindowSize from '../hooks/useWindowSize';
import useAxiosFetch from '../hooks/useAxiosFetch';
const DataContext = createContext({});

export const DataProvider = ({children}) => {
    const [search,setSearch] = useState('');
  const [posts,setPosts] = useState ([
  ]);
  const[editTitle,setEditTitle] = useState('');
  const[editBody,setEditBody] = useState('');
  const[searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const {width} = useWindowSize();
  const{data,fetchError,isLoading} = useAxiosFetch('http://localhost:3500/posts');
  const [postTitle,setPostTitle] = useState("");
  const[postBody,setPostBody] = useState("");
  
  useEffect(() => {
    setPosts(data);
  },[data])
  useEffect(() => {
      const filteredResults = posts.filter((post) => ((post.body).toLowerCase()).includes(search.toLowerCase()) || ((post.title).toLowerCase()).includes(search.toLowerCase()))
      setSearchResults(filteredResults.reverse());
      console.log("search changed");
      console.log(search);
      console.log(filteredResults);
  },[posts,search])
  
  
  
    return(
        <DataContext.Provider value = {{
            width,search,setSearch,posts,setPosts,editTitle,setEditTitle,
            editBody,setEditBody,searchResults,setSearchResults,postTitle,setPostTitle,
            postBody,setPostBody,data,isLoading,fetchError

        }}>{children}</DataContext.Provider>

        
    )
}

export default DataContext;