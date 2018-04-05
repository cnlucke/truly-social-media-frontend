import React from "react";
import { connect } from "react-redux";
// import { fetchHobbits } from './actions'

class UserContainer extends React.Component {
  render() {
    return(
      <div>UserContainer</div>
    )
  }
}

export default connect((state) => ({isLoggedIn: state.isLoggedIn}), null)(UserContainer)
