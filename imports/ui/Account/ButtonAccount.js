import React from 'react'
import PropTypes from 'prop-types'

import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import {  Button} from 'rbx';
import 'bulma/css/bulma.css'

function ButtonAccount(props) {
  const { showModal ,currentUser,hideModal} = props
  
  logout =()=>{
    hideModal()
    Meteor.logout()

  }
  return (
    
      <Button.Group>
      { currentUser ? (<Button color="primary" onClick={()=>logout()}>Deconnexion</Button>) :
      (<Button  onClick={showModal}>Login</Button>)
       }
        </Button.Group>
  
  )
}

ButtonAccount.propTypes = {

}

export default withTracker(()=>{
  return {
    currentUser: Meteor.user(),

  }
})(ButtonAccount)

