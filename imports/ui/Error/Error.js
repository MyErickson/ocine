import React, { Component } from 'react'
import PropTypes from 'prop-types'

// import './Error404.scss'
export default class Error404 extends Component {

    render() {
        return (
            <div className='error-container'>
                <p><strong>Nous n'avons pas ce "{this.props.type}" de film pour le moment</strong> </p>
                <img src='http://fr.bricker.info/images/sets/LEGO/71004-emmet_main.jpg'></img>
            </div>
        )
    }
}
