import React, { Component } from 'react'

import AddMovie from './addMovies/addMovie';
import DeleteMovie from './deleteMovies/DeleteMovie';
import { Layout, Menu, Icon } from 'antd';

const { Header, Sider, Content } = Layout;

import './admin.scss';

class AddArticle extends Component {
  state = {
    collapsed: false,
    content:AddMovie,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  handleModifContent =(content)=>()=>{

    switch(content){
      case 'add':

        this.setState({content: AddMovie})
        break;
      case 'delete':
          this.setState({content:DeleteMovie})
          break;
      case 'edit':
          this.setState({content: ''})
          break
    }
    
  }
  render() {
    const ShowContent = this.state.content
    return (

      <Layout className='admin-container'>
      <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" onClick={this.handleModifContent('add')}>
           <Icon type="plus-square" theme="filled" style={{ fontSize: '20px'}}/>
            <span>Ajouter</span>
          </Menu.Item>
          <Menu.Item key="2 "  onClick={this.handleModifContent('delete')}>
          <Icon type="edit" theme="filled" style={{ fontSize: '20px'}}/>
            <span>Modifier/Supp</span>
          </Menu.Item>
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
            textAlign:'center'
          }}
        >
         <ShowContent/>
        </Content>
      </Layout>
    </Layout>
    )
  }
}

export default AddArticle
