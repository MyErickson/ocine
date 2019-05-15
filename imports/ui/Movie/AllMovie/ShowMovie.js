import React from 'react'
import { Link } from 'react-router-dom';






function ShowMovie({movies}) {
  const slug = require('slug');
  
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';
  const movie= Object.values(movies).map(value=>{
   return(
      <Link key={slug(value.title)} to={`/films/${slug(value.title)}`}>
          <img key={value._id} src={`${IMAGE_BASE_URL}${value.image}`} />
      </Link> 
    ) })
 
  return (

       <div >
            
           {  movie }
   
    </div>

  )
}



export default ShowMovie
