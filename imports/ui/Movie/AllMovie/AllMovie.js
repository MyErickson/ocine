import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ShowMovie from './ShowMovie';
import { withTracker } from 'meteor/react-meteor-data';
import { Movie } from '../../../api/Movie';



import {genres} from '../../../data/dataAddMovie';
import './allMovie.scss'

//antd
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';


export class AllMovie extends Component {
    state = {
        collapsed: false,
        allMovie: this.props.allMovie,
        showMovie:[],
        moviesSortie:[],
      };

      toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      };

      handleClick = ()=>{
          this.setState({showMovie: this.props.allMovie})
      }

      handleClicMovieSortie =(value) =>{
        const show = Movie.find( {apparition: value },{sort: {createdAt: -1 }}).fetch()
   
      
            this.setState({showMovie: show})
        
       
      }
    
      handleClickGenre =(value)=>{
        const show = Movie.find( {genre: value },{sort: {createdAt: -1 }}).fetch()
        this.setState({ showMovie: show})
      }

  render() {
  
 
    return (
        <Layout className='film-container'>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" onClick={this.handleClick}>
              <Icon type="appstore" />
              <span >All</span>
            </Menu.Item>        
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="tags"  />
                  <span>Genres</span>
                </span>
              }
            >
            {
               genres.map((value,key)=>{
              
                    return (<Menu.Item key={key} onClick={()=>this.handleClickGenre(value)}>{value}</Menu.Item>)
                })
            }
             
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="star" />
                  <span>Sortie</span>
                </span>
              }
            >
              <Menu.Item key="6" onClick={()=>this.handleClicMovieSortie(`à l'affiche`)}>à l'affiche </Menu.Item>
              <Menu.Item key="8" onClick={()=>this.handleClicMovieSortie(`avant-premières`)}>Avant-premières</Menu.Item>
              <Menu.Item key="9" onClick={()=>this.handleClicMovieSortie(`nouveautés`)}>nouveautés</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
           <ShowMovie movies={ this.state.showMovie <= 0 ? this.props.allMovie : this.state.showMovie}/>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default withTracker(()=>{
  return{
    allMovie:  Movie.find( {$or:[{apparition:"à l'affiche"} , {apparition:"nouveautés" } ,{apparition:"avant-premièes" }]} ,{sort: {createdAt: -1 }}).fetch(),
  }
}) (AllMovie)
