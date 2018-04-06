import React from "react";
import { connect } from "react-redux";
import Search from '../components/Search'
import MediaModal from '../components/MediaModal'
import { Link } from 'react-router-dom';
import { demo } from '../actions/userActions'

const LandingContainer = (props) => {
  if (props.showMedia) {
    return (
      <MediaModal />
    )
  } else {
    return (
      <div id="landing-container">
        <h1 id="landing-title">What Do You Want to Look For Today?</h1>
        <Search />
        <div className="landing-buttons">
          <button className="landing-button" id="login">
            <Link to="/login">{'log in'}</Link>
          </button>
          <button className="landing-button">
            <Link to="/signup">{'sign up'}</Link>
          </button>
        </div>
        <div className="landing-buttons">
          <button id="demo-button" className="landing-button" onClick={props.demo}>
            <Link to="/">{'demo'}</Link>
          </button>
        </div>
      </div>
    )
  }
}

export default connect((state) => ({
  showMedia: state.media.showMedia,
  isLoggedIn: state.users.isLoggedIn
}), { demo })(LandingContainer)


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
