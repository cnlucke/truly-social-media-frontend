import React from "react";
import { connect } from "react-redux";

class LandingContainer extends React.Component {
  render() {
    if (!localStorage.getItem('jwt')) {
      return (
        <div>ListContainer</div>
      )
    } else {
      return (
        <div>Not Logged In</div>
      )
    }
  }
}

export default connect((state) => ({isLoggedIn: state.isLoggedIn}), null)(LandingContainer)
