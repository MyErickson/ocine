import React from 'react'
import PropTypes from 'prop-types'

import { Input } from 'antd';
const Search = Input.Search;

function SearchMovie({handleSearch}) {
  
  return (
    <div>
       <Search
        className="search"
        placeholder="taper le nom d'un film"
        onChange={evt => handleSearch(evt)}
        allowClear

        />
    </div>
  )
}

Search.propTypes = {

}

export default SearchMovie

