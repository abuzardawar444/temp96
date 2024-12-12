import React from 'react'
import { Link, useRouteError } from 'react-router-dom'
import img from '../assets/not-found.svg';

const Error = () => {
  const error = useRouteError();
  console.log(error);

  return (
    error.status === 404 ?
      <>
        <div>
          <img src={img} alt='not found'/>
          <h3>Ohh ! Page not found</h3>
          <p>We can't find the page you are looking for</p>
          <Link to='/dashboard'>Back Home</Link>
        </div>
      </> :
      <>
        <div>
          Error Page
          <Link to='/'>Go Back</Link>
        </div>
      </> 
  )
}

export default Error
