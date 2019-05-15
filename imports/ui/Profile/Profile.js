import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Profil } from '../../api/Profil';
import { Drawer, Divider, Col, Row , Input ,Button } from 'antd';
import './profile.scss'
const pStyle = {
  fontSize: 16,
  color: 'rgba(0,0,0,0.85)',
  lineHeight: '24px',
  display: 'block',
  marginBottom: 16,
};

const DescriptionItem = ({ title, content }) => (
  <div
    style={{
      fontSize: 14,
      lineHeight: '22px',
      marginBottom: 7,
      color: 'rgba(0,0,0,0.65)',
    }}
  >
    <p
      style={{
        marginRight: 8,
        display: 'inline-block',
        color: 'rgba(0,0,0,0.85)',
       
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);

class Profile extends Component {
    state={
        showInput:false,
        prenom:'',
        nom:'',
        ville:'',
        pays:'',
        birthday:'',
        website:'',
        email:'',
        phoneNumber:'',
        message:'',


    }
    onClickRegister =()=>{
        const {
            prenom, nom , ville, pays ,message,
           birthday, website , email , phoneNumber , showInput
        } = this.state
  
        Profil.insert({
                _id:Meteor.userId(),
                prenom,
                nom,
                ville,
                pays,
                message,
                birthday,
                website,
                email,
                phoneNumber,
                showInput
        }
        )
    }

  onClickModify = () =>{
      this.setState({ showInput:true })
  }

  onChange =(evt)=> {
      const { name , value } = evt.target;
      this.setState({ [name]: value})
  }

  render() {
      const{
          prenom, nom , ville, pays ,message,
         birthday, website , email , phoneNumber , showInput
      } = this.state


    return (

      
        <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={this.props.onClose}
          visible={this.props.visible}
        >
          <p style={{ ...pStyle, marginBottom: 24 }}> Profil d'utilisateur</p>
         
          <Row>
            <Col span={12}>
              <DescriptionItem title="Prenom" content={ 
                  showInput ? <Input name="prenom" value={prenom} onChange={this.onChange} placeholder='prénom'/> : prenom } /> 
            </Col>
            <Col span={12}>
              <DescriptionItem title="Nom" content={
                  showInput ? <Input name="nom" value={nom} onChange={this.onChange} placeholder='nom'/>  :nom} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Ville" content={
                  showInput ? <Input name="ville" value={ville} onChange={this.onChange} placeholder='ville'/> : ville} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Pays" content={
                  showInput ? <Input name="pays" value={pays} onChange={this.onChange} placeholder='pays'/> : pays} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Birthday" content={
                  showInput ? <Input name="birthday" value={birthday} onChange={this.onChange} placeholder='Birthday'/> : birthday} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Website" content={
                  showInput ? <Input name="website" value={website} onChange={this.onChange} placeholder='username'/> : website} />
            </Col>
          </Row>
        
        
      
          <Divider />
          <p style={pStyle}>Contacts</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Email" content={
                  showInput ? <Input name="email" value={email} onChange={this.onChange} placeholder='@Mymail'/> : email} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Phone Number" content={
                showInput ? 
                <Input name="phoneNumber" value={phoneNumber} onChange={this.onChange} placeholder='01-23-45-67-89'/> : phoneNumber
            } />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Message"  
                content={showInput ?  <Input value={message} onChange={this.onChange} placeholder='message'/> : message}
              />
            </Col>
          </Row>
          <div
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button onClick={this.onClickModify} style={{ marginRight: 8 }}>
              Modifier
            </Button>
            <Button onClick={this.onClickRegister} type="primary">
              Enregistrer
            </Button>
          </div>
        </Drawer>

    );
  }
}

export default  withTracker (()=>{
    return {
        currentUser: Meteor.user()
    }
})(Profile)
