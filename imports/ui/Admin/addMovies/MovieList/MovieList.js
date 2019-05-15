import React from 'react'
import PropTypes from 'prop-types';

import MovieListItem from './MovieListItem';

const MovieList=({movieList , callback})=> {

    const receiveCallBack =(movie)=>{

        callback(movie);

    }

  return (
    <div>
         <ul>
                {
                    movieList.map( movie => { 
                           
                        return <MovieListItem key = { movie.id } movie ={ movie } receiveCallback={receiveCallBack}/>
                    })
                }
                
                
            </ul>
    </div>
  )
}
MovieList.propTypes = {

}

export default MovieList

