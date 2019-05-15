import React, {  Fragment , Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data';
import { ReactiveVar } from 'meteor/reactive-var'
import { Movie } from '../../api/Movie';
//composant
import MovieEnCours from './MovieEnCours/MovieEnCours';
import MovieProchainement from './MovieProchainement/MovieProchainement';



import './accueil.scss';

class Accueil extends Component {
  
  state={
     moviesFisrtNav:this.props.moviesALaffiche,
     moviesSecondNav:this.props.movieProchainesSorties,
   
    
  }
 componentDidMount() {
 }

  handleClickEnCours =(value) =>{
    const show = Movie.find( {apparition: value },{sort: {createdAt: -1 }, limit: 10}).fetch()

        this.setState({moviesFisrtNav: show})
     
  }

  handleClickProchainement = (value) => {
    const show = Movie.find( {apparition: value },{sort: {createdAt: -1 }, limit: 10}).fetch()
  
      this.setState({moviesSecondNav:show})
    
  }

 render(){

    return (
      <Fragment>
      
      <div className='acceuil-container'>
      <div className="acceuil-nav-EnCours">
            <span onClick={()=>this.handleClickEnCours(`à l'affiche`)}  >à l'affiche</span>
            <span onClick={()=>this.handleClickEnCours('nouveautés')} >nouveautés</span>
            <span onClick={()=>this.handleClickEnCours('avant-premières')}>avant-premières</span>
        </div> 
        <MovieEnCours 
        movies={this.state.moviesFisrtNav <= 0 ? this.props.moviesALaffiche : this.state.moviesFisrtNav  } 
        />
        <div className="acceuil-nav-prochainement">
          <span onClick={()=>this.handleClickProchainement('prochaines sorties')} >prochaines sorties</span>
          <span onClick={()=>this.handleClickProchainement('plus attendus')} >plus attendus</span>
      </div> 
        <MovieProchainement 
        movies={this.state.moviesSecondNav <= 0 ? this.props.movieProchainesSorties : this.state.moviesSecondNav  }
        />
      </div>

      </Fragment>
    )
  }
}

export default withTracker ((props)=>{

  return {
      moviesALaffiche: Movie.find( {apparition:"à l'affiche" },{sort: {createdAt: -1 }, limit: 10}).fetch(),
      movieProchainesSorties: Movie.find( {apparition:"prochaines sorties" },{sort: {createdAt: -1}, limit: 10}).fetch(),
    
  }
})(Accueil)



