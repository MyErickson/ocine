import React from 'react'
import { Link } from 'react-router-dom';

import './deleteMovie.scss'
import { Button,Popconfirm, message } from 'antd';

function FindMovies({movies,showModal}) {


  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';


  const hanldeClick =(id,title,video,description)=>{
    showModal(id,title,video,description)
  }
  
  const movie= Object.values(movies).map(value=>{
   return(
          <div className='find-img' key={value._id}>
            <img  src={`${IMAGE_BASE_URL}${value.image}`} />
        
            <Button  type="danger" className='button-delete' onClick={()=>hanldeClick(value._id,value.title,value.video,value.description)}>Modifier</Button>

       
           
          </div>
    ) })
 
  return (

       
        <div className='delete-card'>
            
           { 
             movie }
  
            
            </div>

  )
}



export default FindMovies