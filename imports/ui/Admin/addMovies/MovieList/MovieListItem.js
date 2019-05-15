import React from 'react';

const MovieListItem = ({movie, receiveCallback}) => {

    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500/";
    
            function handleOnClick() {
                receiveCallback(movie);
            }
    return <li className="list-group-item" onClick={handleOnClick}>
        <div className="media">
                <div className="media-left">
                        <img className="media-object img-rounded" height="150px" width="150px"  src={`${IMAGE_BASE_URL}${movie.poster_path}`}></img>
                </div>
       
        <div className="media-body">
            <h5 className="title_list_item">{movie.title}</h5>  
        </div>
                </div>
        </li>
    
}

export default MovieListItem;