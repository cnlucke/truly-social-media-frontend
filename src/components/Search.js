import React, { Component } from 'react';
import { connect } from "react-redux";

class Search extends Component {
  render() {
    return(
      <input type="search" id="search"></input>
    )
  }

}

export default connect(null, null)(Search)
