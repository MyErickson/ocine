import React from 'react'
import HoraireSalle from './HoraireSalle';

import { Select, Row , Col ,Form  } from 'antd';
import { genres , apparations , heures } from '../../../../data/dataAddMovie';
import './error.scss'

const Option = Select.Option;

const DetailModal =(props)=> {
        const {handleChange, schedule , error} = props;

        const childrenGenre = [];
        const childrenApparation = [];
        const childrenHeures = [];


        Object.values(genres).map((value,key)=>{
            childrenGenre.push(<Option key={key} value={value}>{value}</Option>);
        })

        Object.values(apparations).map((value,key)=>{
            childrenApparation.push(<Option key={key} value={value}>{value}</Option>);
        })

        Object.values(heures).map((value,key)=>{
            childrenHeures.push(<Option key={key} value={value}>{value}</Option>);
        })
     

  
          
    return (
        <Form >
            <Row> 
                <Col span={4}>
                    Genre
                </Col>
                < Col span={20}>
                <Form.Item>
                    <Select
                    
                        allowClear={true}
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="selectionner un ou plusieur genre(s)"
                        onChange={ value => handleChange(value,'genre')} 
                      
                    >
                        {childrenGenre}
                    </Select>
                    </Form.Item>
                </Col>
            </Row> 
            <Row> 
                <Col span={4}>
                    Apparation
                </Col>
                < Col span={20}>
                <Form.Item>
                    <Select
                        style={{ width: '100%' }}
                        placeholder="select please"
                        onChange={value => handleChange(value,'apparition')} 
                    >
                        {childrenApparation}
                    </Select>
                    </Form.Item>
                </Col>
            </Row>
           
            <Row> 
               <Col span={4}>horaires</Col>
                < Col span={20}>
                <Form.Item>
                <HoraireSalle 
                    handleChange={handleChange}
                    schedule = {schedule}
                  />
                 </Form.Item>
                </Col>
            </Row>
         { error && ( 
         <Row> 
               <Col span={8}></Col>
                < Col span={16} className='error'>
                        Veuillez saisie les champs
                </Col>
            </Row> )
        }
           
        </Form> 
    )
    
}
export default DetailModal
