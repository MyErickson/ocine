import React , { Component } from 'react'
import PropTypes from 'prop-types'

import Profile from '../../Profile/Profile';

//router
import { NavLink } from 'react-router-dom';


import { Navbar} from 'rbx';

import 'bulma/css/bulma.css'
import './nav.scss';
import ButtonAccount from '../../Account/ButtonAccount';

class Nav extends Component {
  state = { visible: false };

  showDrawer = () => {

    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };


  render(){

    return (
           
      <Navbar>
          <Navbar.Burger/>
        <Navbar.Menu>
          <Navbar.Segment align="start">
            <NavLink exact to="/"><span className="navbar-item" >ACCUEIL</span></NavLink>
            <NavLink exact to="/films"><span className="navbar-item">FILM</span></NavLink>
            <NavLink exact to="/abonnement"><span className="navbar-item">ABONNEMENT</span></NavLink>
            <span className="navbar-item" onClick={()=>this.showDrawer()}>PROFIL</span>
            <Profile onClose={this.onClose} visible={this.state.visible} showDrawer={this.state.showDrawer}/>
            <NavLink exact to="/admin"><span className="navbar-item">ADMIN</span></NavLink>
          </Navbar.Segment>
          <Navbar.Segment align="end">
            <Navbar.Item>
              <ButtonAccount {...this.props}/>
            </Navbar.Item>
          </Navbar.Segment>
        </Navbar.Menu>
      </Navbar>
  
    )
  }
 
}

Nav.propTypes = {

}

export default Nav

