import React, { Component } from 'react'
import {Movie} from './../../../api/Movie';
import {Reservation} from './../../../api/Reservation'
import { treeData} from './../../../data/dataAddMovie';
import Error404 from './../../Error404/Error404'
import { Layout, Button ,Modal ,Breadcrumb, Menu , Dropdown, Icon } from 'antd';
import './detailMovie.scss'
import  Commentaire  from './Comentaire';
const { Header, Footer,  Content } = Layout;

class DetailMovie extends Component {
    state = { visible: false,
        horaire: false
    };

    componentDidMount(){
        this.showReservation('Lundi')
        console.log('did')
    }

    showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
   
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };

      showReservation =(jour)=>{
        const { slug } =  this.props.match.params;
        const regex = /-/gi;
        const slugTitle = slug.replace(regex, ' ');
       const reservationMovie =  Reservation.find({title:slugTitle}).fetch()
       const  horaire = reservationMovie.map(value=>{
            var tab = []
               if(  value.jour === jour){
                     tab += value.heure
               }

               return tab
            
        })
        this.setState({horaire})
        
      }

    render() {
        const { slug } =  this.props.match.params;
        const regex = /-/gi;
        const slugTitle = slug.replace(regex, ' ');
        const currentMovie = Movie.find({title:slugTitle}).fetch();
       
        const {horaire} = this.state
        var image = '';
        var title ='';
        var genre= '';
        var description= '';
        var video = '';

        if(currentMovie.length !== 0 ){
            image = currentMovie[0].image
            title = currentMovie[0].title
            genre = currentMovie[0].genre.join(', ')
            description = currentMovie[0].description
            video = currentMovie[0].video
        }

      



        
       console.log(currentMovie,'movie')
        return (
            
                <Layout className='container-detailMovie'>
                     { currentMovie.length > 0  ?  
                     <>
                    <Header style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${image})`}}>
                   
                        <div>
                            <p className='detail-title'>{title}</p>
                            <p className='detail-genre'>{genre}</p>
                        </div>
                       <div className='detail-button'>
                           <a href='#horaire'><Button type="primary" icon='clock-circle' className='detail-button-seance'>Seance</Button></a>
                     
                            <Button type="primary" className='detail-button-BA' onClick={this.showModal} >Bande Annonce</Button>
                       </div>
                        
                       
                        <div className='detail-description'>{description}</div>

                    </Header>
                    <Content className='detail-content'>
                        <div className='detail-content-p'>
                            <p className='detail-content-titre'>Séance et reservations</p>
                            <p className='detail-content-text'>Ce film est disponible dans un cinema de 350 salles </p>
                        </div>
                        <div id="horaire"></div>
                        <div className='detail-jour'>
                            <Breadcrumb>
                            { treeData.map(value=>{
                                return (
                                    <Breadcrumb.Item
                                     key={value.title} 
                                    className='detail-jour-title'
                                     onClick={()=>this.showReservation(value.title)}>{value.title}</Breadcrumb.Item>
                                )
                            })}
                                
                            </Breadcrumb>
                        </div>
                    </Content>
                    <Footer>
                        
                        { horaire && (
                        <div className='detail-horaire'>
                        { horaire.map(value=>{
                            return (<div className='detail-heures'>{value}</div>)
                        })  }
                        </div>
                        )} 
                
                        <Commentaire/>
             
                        
                    </Footer>
                    <Modal
                    className='modal-detail'
                    visible={this.state.visible}
                    footer={false}
                    closable={false}
                    onCancel={this.handleCancel}
                    width={1000}
                    centered={true}
                 
                    >
                        <iframe className='detail-video' src={`https://www.youtube.com/embed/${video}`} />
                     </Modal>
                       </> : <Error404/>}
                </Layout>
                  
        )
    }
}

export default DetailMovie
