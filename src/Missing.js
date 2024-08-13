import React from 'react';
import {Link} from 'react-router-dom';
const Missing = () => {
  //pages that displays if post does not exist
  return (
    <div>
        <h1>404 Error</h1>
        <p>Well thats unlucky</p>
        <Link to = '/'>Return to Home</Link>
    </div>
  )
}

export default Missing