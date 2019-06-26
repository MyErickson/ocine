import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';

import {Commentaires} from './../../../api/Commentaires';
import {Profil} from './../../../api/Profil';


import {
  Row, Col, Card, Icon,Comment, Avatar, Form, Button, List, Input
} from 'antd';
const { TextArea } = Input;

import './commentaire.scss'

const CommentList = ({ comments }) => (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={props => <Comment {...props} />}
    />
  );

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button className='com-button' htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          Ajouter un commentaire
        </Button>
      </Form.Item>
    </div>
  );
class Commentaire extends Component{
    state = {
        comments: [],
        submitting: false,
        value: '',
      };
    
      handleSubmit = () => {
        if (!this.state.value) {
          return;
        }
    
        this.setState({
          submitting: true,
        });
    
        setTimeout(() => {
          this.setState({
            submitting: false,
            value: '',
            comments: [
              {
                author: 'Han Solo',
                avatar: 'https://cdn2.iconfinder.com/data/icons/user-interface-solid-6/64/User_Interface_Glyph-01-512.png',
                content: <p>{this.state.value}</p>,
               
                
              },
              ...this.state.comments,
            ],
          });
        }, 1000);

        Commentaires.insert({
            user:Meteor.userId(),
            title:this.props.slug,
            content:this.state.value,
            createdAt: new Date()
        })

      };

      handleChange = e => {
        this.setState({
          value: e.target.value,
        });
      };
    

    render(){

        const showComs = Commentaires.find({title:this.props.slug},{sort: {createdAt: -1 }}).fetch()
        const profil = Profil.find({_id:Meteor.userId()}).fetch()
       console.log(Meteor.userId())
        const {  submitting, value } = this.state;
            return(

                <div className='commentaire'>
                 
                { Meteor.userId() && 
                   <Comment
                 
                   content={
                       <Editor
                       onChange={this.handleChange}
                       onSubmit={this.handleSubmit}
                       submitting={submitting}
                       value={value}
                       />
                   }
                   />
                }
                 
              

          <Col span={10}>
            <InfiniteScroll
              initialLoad={false}
              pageStart={0}
              loadMore={() => {}}
              useWindow={false}
            >
              <div className="content-listAnnonce">
                {showComs && showComs.map((value, key) => (
        
                  <Card
                    key={key}
                    title={profil.length > 0 && ` ${profil[0].prenom} ${profil[0].nom}`}
                    className="message-annonce"
                    extra={(
                      <Icon
                        type="star"
                        theme="twoTone"
                        className="icon-start-annonce"
                      />
               )}
                  >
                    <Row type="flex" justify="space-between">
                      
                        <InfiniteScroll
                          initialLoad={false}
                          pageStart={0}
                          loadMore={() => {}}
                          useWindow={false}
                        >
                          <p >{ value.content }</p>
                        </InfiniteScroll>
                      
                    </Row>
                  </Card>
                ))}
              </div>
            </InfiniteScroll>
          </Col>
          </div>
        ) };
        
} 

export default Commentaire;
