import React,  { Fragment, Component } from 'react'

import { Modal , Button } from 'antd';

import { Movie } from '../../../../api/Movie';
import {  Reservation } from '../../../../api/Reservation';
import DetailModal from './DetailModal';
import { movieContext } from '../addMovie';





class ModalForAdd extends Component  {
      
    state= {
        genre:{},
        apparition:'',
        schedule:null,
        visible:false,
        error:false,
        


    }
    

    handleSubmit = (evt,value) => {
        evt.preventDefault()
        const { genre , apparition , schedule } = this.state;
        const { title , overview ,poster_path, videoId} = value;


        if( genre === [] || apparition === ''  || schedule === null) {
       
            return  this.setState({error: true})

        }else { 

        this.showModal(evt)
        
        Movie.insert({
          title: title,
          description: overview,
          image:poster_path,
          video:videoId,
          genre:genre,
          apparition:apparition,
          createdAt: new Date()
        })
        this.AddSchedule(title,videoId)
        this.setState({error:false ,  genre:{}, apparition:''})
      }
    }

    AddSchedule=(title , videoId)=>{
        const {schedule } = this.state;
        schedule.map(({value}) => {
          
          if( value.length > 8 ){

              let split = value.split('-');
              let jour = split[0];
              let heure = split[1];

              Reservation.insert({
                title:title,
                video:videoId,
                jour: jour,
                heure:heure,
                place:500,
                createdAt: new Date()
              })
            }
        })
        this.setState({ schedule : null})

     }

    handleChange= (value,name) => {
     
        this.setState({[name]:value})
    }


    showModal = (evt) => {
      
      const { name } = evt.target;
      if(name === 'show'){
         return this.setState({
            visible: true,
            error:false
          });
      } else {
        return  this.setState({
          visible: false,
          error:false
        });
      }
     
    }
  


  render(){

   
    return (
     
        <Fragment>
        <Button className="add-button" name="show" onClick={this.showModal}>
          Ajouter
        </Button>
        <movieContext.Consumer>
          { value => 
            <Modal
              title="Add Movie"
              visible={this.state.visible}
              onOk={evt=>this.handleSubmit(evt,value)}
              onCancel={this.showModal}
              okText="Add"
              
            >
        
          <DetailModal 
          handleChange={this.handleChange}
          schedule={this.state.schedule}
          error={this.state.error}
          
          />
          </Modal> }
        </movieContext.Consumer>
      </Fragment>
    )
    }
}

export default ModalForAdd
