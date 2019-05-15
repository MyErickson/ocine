import React from 'react';
import {  Row, Col } from 'antd';

import ModalForAdd from '../addModalMovie/ModalForAdd';

const VideoDetail = ({title, description,visible,handleCancel,handleOk,showModal}) => {
    const handleClick=()=>{
        
    }

    return (
        <div className="videoDetail">
            <Row>
                <Col span={4}></Col>
                <Col span={16}>
                    <h1>{title}</h1>
                </Col>
                <Col span={4} className="add" onClick={()=> handleClick()}>
                    <ModalForAdd
                      
                    />
                    
                </Col>
            </Row>
            <p>{description}</p>
        </div>
    )

}

export default VideoDetail;