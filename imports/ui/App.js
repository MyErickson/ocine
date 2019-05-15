import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
//router
import {  Route , Switch } from 'react-router-dom';

//css
import './app.scss' 

//Composant
import Header from './Header/Header';
import Account from './Account/Account';
import Footer from './Footer/Footer';
import Accueil from './Accueil/Accueil';
import AllMovie from './Movie/AllMovie/AllMovie';
import Admin from './Admin/Admin';
import Movie from './Movie/Movie';
import Profile from './Profile/Profile'

export class App extends Component {
  state = { 
    visible: false,
   }

  showModal = () => {
     
    this.setState({
      visible: true,
    });
  }

  hideModal=()=>{
    
    this.setState({
      visible: false,
    });
  }

  
  render() {
   
    return (
      <div className="app" >
        <Header 
          showModal={this.showModal}
          hideModal={this.hideModal}
        />
        <Account  
          visible={this.state.visible}
          hideModal={this.hideModal}
        />
        <Switch >
          <Route exact path="/" component={Accueil} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/films" component={AllMovie} />
          <Route exact path="/films/:slug" component={Movie} />
          
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default withTracker(()=>{
  return {
    currentUser: Meteor.user(),
  
  }
})(App) 
