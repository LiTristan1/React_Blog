import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';

import Home from './Home';
import About from './About';
import PostPage from './PostPage';
import NewPost from './NewPost';
import Missing from './Missing';
import Layout from './Layout';
import {BrowserRouter, Routes, Route,useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import useAxiosFetch from './hooks/useAxiosFetch';

import EditPost from './EditPost';
import {useStoreActions} from 'easy-peasy';
import {DataProvider} from './context/DataContext'

function App() {
  //Set posts using the state manager from state Posts
  const setPosts = useStoreActions((actions) => actions.setPosts);
  //Retrieve data from json-server
  const{data,fetchError,isLoading} = useAxiosFetch('http://localhost:3500/posts');
  useEffect(() => {
    setPosts(data);
  },[data,setPosts])
  
  //Configure routes for app
  return (
    <div className="App">
      {/**Wrap everything in the data provider managing global state */}
      <DataProvider>
        <Header title = "React JS Blog"></Header>
        
          <Nav></Nav>
            <Routes>
                <Route path = '/' element = {<Layout/>}>
                  <Route index element = {<Home isLoading  = {isLoading} fetchError = {fetchError}/>}/>
                  <Route path ='post' element = {<NewPost/>}/>
                  
                  <Route path = 'post/:id' element = {<PostPage />}/>
                  <Route path = '*' element = {<Missing/>}/>
                </Route>
                <Route path = 'edit/:id' element = {<EditPost />}></Route>
            </Routes>
          
          
        <Footer></Footer>
      </DataProvider>
    </div>
  );
}

export default App;
