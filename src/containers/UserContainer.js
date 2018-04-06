import React from "react";
import { connect } from "react-redux";
import LoginForm from '../components/LoginForm'
import SignUpForm from '../components/SignUpForm'
import MediaModal from '../components/MediaModal'
import Search from '../components/Search'
import { withRouter } from 'react-router'

const UserContainer = (props) => {
  console.log("UserContainer props:", props)
  if (props.isLoggedIn && props.currentUser && !props.showMedia) {
    return (
      <div id="landing-container">
        <h5>{`Welcome, ${props.currentUser.first_name}!`}</h5>
        <h1 id="landing-title">What Do You Want to Look For Today?</h1>
        <Search />
      </div>
    )
  } else if (props.showMedia){
    return (
            <MediaModal />
            )
  } else {
    const path = props.location.pathname.slice(1)
    return (
      <div id="form">
        {(path === 'login' ? (<LoginForm />)
          : (path === 'signup') ? (<SignUpForm />)
          : null )}
        </div>
      )
    }
  }

  const mapStateToProps = (state) => {
    return {
      isLoggedIn: state.users.isLoggedIn,
      currentUser: state.users.currentUser,
      showMedia: state.media.showMedia,
    }
  }

  export default connect(mapStateToProps, null)(withRouter(UserContainer))
