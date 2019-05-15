import React, { PureComponent } from 'react';
import { TreeSelect } from 'antd';

import {  treeData } from '../../../../data/dataAddMovie';

const SHOW_PARENT = TreeSelect.SHOW_PARENT;




const HoraireSalle =({ handleChange, schedule })=> {


    const onChange=  (value ) => {
         handleChange(value,'schedule')
      }

 
    const tProps = {
      treeData,
      value: schedule,
      onChange:onChange,
      treeCheckable: true,
      treeCheckStrictly: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: 'Please select',
      style: {
        width: 395,
      },
    }
    return <TreeSelect {...tProps} />;
  }


export default HoraireSalle