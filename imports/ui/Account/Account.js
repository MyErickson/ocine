import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Blaze from 'meteor/gadicc:blaze-react-component';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';



//ant design
import { Modal } from 'antd';
import "antd/dist/antd.css";





const Account=({currentUser, hideModal, visible})=>{

  return (
    <Fragment>
      {!currentUser && 
        
    <Modal
    title="Login"
    
    visible={visible}
    footer={false}
    onCancel={hideModal}
    >
          
      <Blaze template="atForm"  /> 
        
    </Modal>
     }</Fragment>  
  )}


export default withTracker(()=>{
    return {
      currentUser: Meteor.user(),
    
    }
  })(Account) 