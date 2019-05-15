import React from 'react'
import PropTypes from 'prop-types'


//composant
import Nav from './Nav/Nav';
import ButtonAccount from'../Account/ButtonAccount';

//css
import './header.scss';

function Header(props) {
  
  return (
    <header className="header-app">
      <div className="header-title">
      <span className="title" >O'Ciné</span>
      
      </div>
       
      <Nav {...props}/>   
    </ header>
  )
}

Header.propTypes = {

}

export default Header

