import React from "react";
import { connect } from "react-redux";
import Search from '../components/Search'
import { Link } from 'react-router-dom';
import { loginUser } from '../actions/userActions'
// import { fetchHobbits } from './actions'

class LandingContainer extends React.Component {
  render() {
    return (
      <div id="landing-container">
        <h1 id="landing-title">What Do You Want to Look For Today?</h1>
        <Search />
        <div id="landing-buttons">
          <button className="landing-button" id="login" onClick={this.props.loginUser}>
            <Link to="/login">{'log in'}</Link>
          </button>
          <button className="landing-button">
            <Link to="/signup">{'sign up'}</Link>
          </button>
        </div>
      </div>
    )
  }
}

export default connect((state) => ({isLoggedIn: state.users.isLoggedIn}), { loginUser })(LandingContainer)


// if (localStorage.getItem('jwt')) {
//   return (
//     <div>
//       <p>Hello</p>
//       <button>{'log in'}</button>
//       <button>{'sign up'}</button>
//     </div>
//   )
// } else {
//   return (
//     <div>
//       <LoginContainer />
//     </div>
//   )
// }
