import React from 'react';
import Feed from './Feed';
import {useStoreState} from 'easy-peasy';
const Home = ({isLoading,fetchError}) => {
  const searchResults = useStoreState((state) => state.searchResults);
  return (
    <div className = 'Home'>

      {/**Ensure a blank page is not displayed when data not yet received from json-server */}
      {isLoading && <p>Data Loading</p>}
      {fetchError && <p>Error loading data {fetchError}</p>}
        {/**Pass data downt to feed */}
        {<Feed posts = {searchResults}/>}
    </div>
  )
}

export default Home;