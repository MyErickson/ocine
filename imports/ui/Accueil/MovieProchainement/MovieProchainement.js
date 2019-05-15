import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


function MovieProchainement({movies}) {
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';
  const slug = require('slug');


  const movie= Object.values(movies).map(value=>{
   return(
    <Link key={slug(value.title)} to={`/films/${slug(value.title)}`}>
        <img key={value._id} src={`${IMAGE_BASE_URL}${value.image}`} />  
    </Link> 
   ) })
 
   
  return (
 
   
    <div className='acceuil-card'>
        {movie}

    </div>
 
  )
}

MovieProchainement.propTypes = {

}

export default MovieProchainement


