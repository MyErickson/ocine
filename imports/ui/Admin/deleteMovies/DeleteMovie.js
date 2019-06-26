import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FindMovie from './FindMovies';
import {Movie} from '../../../api/Movie';
import {Reservation} from '../../../api/Reservation';

import { withTracker } from 'meteor/react-meteor-data';
import { ReactiveVar } from 'meteor/reactive-var'

import './deleteMovie.scss'

import { Input,Modal, Button,Layout } from 'antd';
const { TextArea } = Input;
const Search = Input.Search;
const { Header, Footer, Sider, Content } = Layout;


 class DeleteMovie extends Component {
     state ={
         movies:[],
         search:'',
         visible:false,
         id:'',
         title:'',
         video:'',
         description:'',
         currentMovie:[],
         edit:false,
         cancel:false,
     
     }

     handleChange = (evt)=>{
        const { value } = evt.target
        const movies = Movie.find( { title: new RegExp('^'+value,'i')}, {sort: {limit:8} }).fetch()
        console.log(movies)
        this.setState({ movies,search:value})
     }
     deleteMovie=()=>{
         const { id , title} = this.state
       
        const findMovie= Reservation.find({title: title}).fetch()
       
        findMovie.map(value=>{
            Reservation.remove({_id:value._id})
        })
        
         Movie.remove({_id:id})
         this.setState({search:'', visible:false , cancel:true})
     }

     editMovie=()=>{
         const { id , title , description , video} = this.state;
      Movie.update(
          {_id:id},
          {$set: {
              title,
              video,
              description
           }})
     }

     showEditMovie =() =>{
        this.setState({edit:true})
     }

     showModal = (id,title,video,description) => {
        const currentMovie = Movie.find({_id:id}).fetch()
      
        this.setState({
          visible: true,
          id,
          title,
          currentMovie,
          video,
          description
        });
      };
    

      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
          edit:false,
          cancel:false
        });
      };
    
    onChange =(evt) =>{
        const { name , value } = evt.target;
        this.setState({ [name]: value})
    }
  
 
    render() {

   
        const {currentMovie,video,title,description} = this.state;
     
        return (
            <>
                <div className='movie-input'>Modifier ou supprimer un film </div>
                <Search
                    className="search"
                    placeholder="taper le nom d'un film"
                    onChange={(evt)=>{this.handleChange(evt)} }
                    value={this.state.search}
                    allowClear
                />
                <div className='findMovie'>
                   <FindMovie 
                    movies={this.state.movies <=0 ? this.props.movies : this.state.movies}
                    deleteMovie={this.deleteMovie}
                    showModal={this.showModal}
                   />
                </div>
                <Modal
                    title={this.state.title}
                    visible={this.state.visible}
                    footer={false}
                    onCancel={this.handleCancel} 

                    >
                        { currentMovie.length > 0 ?
                        
                         
                            <Layout className='layout-modal-modif' >
                                
                                <Content> 
                                    {!this.state.edit ?
                                        <> 
                                            <p> <strong>Titre: </strong>{title}</p> 
                                            <p> <strong>Video Youtube: </strong>  {video}</p>
                                            <p> <strong> Description: </strong> {description}</p>
                                        </> 
                                        :
                                        <>
                                            <Input name="title" value={title} onChange={this.onChange} />
                                            <Input name="video" value={video} onChange={this.onChange} />
                                            <TextArea rows={4} name="description" value={description} onChange={this.onChange}  />
                                        </>

                                } 
                                    
                                </Content>
                                <Footer>
                                    
                                    <Button  type="danger" className='button-delete' 
                                    onClick={!this.state.edit ? this.deleteMovie : this.handleCancel }>
                                        {!this.state.edit ? 'Supprimer' : 'Annuler'}
                                    </Button>
                                    <Button type="primary" onClick={!this.state.edit ? this.showEditMovie  : this.editMovie }>
                                        {!this.state.edit ? 'Modifier' : 'Enregistrer'}
                                    </Button>
                                </Footer>
                            </Layout> 

                         : <p>errer</p>
                            
                        } 
                       
                     
                </Modal>
              
            </>
        )
    }
}

export default withTracker(()=>{
   
    return{
         movies: Movie.find( {},{limit: 8}).fetch()
    }
     
}) (DeleteMovie)
