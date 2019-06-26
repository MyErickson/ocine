import React, {Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import SearchMovie from './Search/SearchMovie';
import MovieList from './MovieList/MovieList';
import VideoDetail from './video/VideoDetail';
import Video from './video/Video';


import './Movie.scss'

export const movieContext = React.createContext({
  currentMovie:{}
})
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images"
const API_KEY = "api_key=6f3d7f606944b80a498c20a58177bead";

class  AddMovie extends Component {
    state = {
        addMovie:'',
        currentMovie:{},
        movieList:{},
     
   
    }


    //Methode pour le onChange du searchBar
     handleSearch=(evt)=>{
        const{ value } = evt.target

        this.setState({addMovie: value}) 
          setTimeout(()=>{
            this.onChangeSearch(this.state.addMovie),1000
          })
      
      
    }

  

    //Methode qui recupère la video d'un movie
    applyVideoToCurrentMovie=()=>{
      
      axios.get(`https://api.themoviedb.org/3/movie/${this.state.currentMovie.id}?${API_KEY}&append_to_response=videos&include_adult=false` )
      .then( (response)=>{
        // console.log(response.data.videos)
          const youtubeKey = response.data.videos.results[0].key;
          let newCurrentMovieState= this.state.currentMovie;
          newCurrentMovieState.videoId = youtubeKey;
          this.setState({currentMovie : newCurrentMovieState});

      }).catch((error)=>{
          console.log(error);
      });

  }

    onChangeSearch=(searchText)=>{
     
      if(searchText){
          axios.get(`https://api.themoviedb.org/3/search/movie?language=fr&include_adulte=false&${API_KEY}&query=${searchText}` )
          .then((response)=>{
             
             if(response.data && response.data.results[0]){
                this.setState({
                  currentMovie:response.data.results[0]
                })
                this.applyVideoToCurrentMovie();
                 this.setRecommendation()

             }   
          })
          .catch(function(error){
              console.log(error);
          });
          }
      }


      //methode pour afficher 4 films recommander via la barre de recherche
      setRecommendation=()=>{
        axios.get(`https://api.themoviedb.org/3/movie/${this.state.currentMovie.id}/recommendations?${API_KEY}&language=fr` 
        ).then( (response)=>{
            // console.log(response, 'setreceommandatoion')
            this.setState({movieList : response.data.results.slice(0,4)});
     
 
         }).catch(function(error){
             console.log(error);
         });
      }

      //Methode pour changer de video et afficher 4 autres films recommander
      onClickMovieListItem=(movie)=>{
          this.setState({currentMovie:movie},()=>{
            this.applyVideoToCurrentMovie();
            this.setRecommendation();
        })
      }

    

  render(){
   
    const RenderVideoList = () => {
      if(this.state.movieList.length >= 3){
          return <MovieList movieList = {this.state.movieList} callback={this.onClickMovieListItem}/>
      }
  }
  
  return (
    <div className="movie-container">
      
        <div className='movie-input'>Recherche d'un film à ajouter </div>
       
        <SearchMovie handleSearch={this.handleSearch} fonction='ajouter'/>
        <div className="row movie-card">
          <div className="col-md-8">
          {this.state.currentMovie.videoId && 
          ( 
          <Fragment>
            <Video videoId={this.state.currentMovie.videoId}/> 
            <movieContext.Provider value={this.state.currentMovie}>
              <VideoDetail 
                title={this.state.currentMovie.title}  
                description = {this.state.currentMovie.overview}
              
              />
            </movieContext.Provider>
          </Fragment>
          )
          }
          </div>
          <div className="col-md-4">
            {RenderVideoList()}
          </div>
          
      </div>
    </div>
  )
}
}

export default AddMovie

