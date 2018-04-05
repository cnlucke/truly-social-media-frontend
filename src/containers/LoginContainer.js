import React from "react";
import { connect } from "react-redux";
// import { fetchHobbits } from './actions'

class LoginContainer extends React.Component {
  render() {
    return(
      <div>LoginContainer</div>
    )
  }
}

export default connect((state) => ({isLoggedIn: state.isLoggedIn}), null)(LoginContainer)
