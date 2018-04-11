import React from "react";
import { connect } from "react-redux";
import LoginForm from '../components/LoginForm'
import SignUpForm from '../components/SignUpForm'
import ItemModal from '../components/ItemModal'
import Search from '../components/Search'
import { getUser } from '../actions/userActions'
import { fetchComments } from '../actions/commentActions'
import { withRouter } from 'react-router-dom'

class UserContainer extends React.Component {
  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.getUser();
      this.props.fetchComments();
    }
  }

  buildWelcomeMsg = () => {
    if (this.props.currentUser) {
      return (this.props.currentUser.email === 'demo@example.com') ? 'Welcome to the Demo!'
                          : `Welcome, ${this.props.currentUser.first_name}!`
    } else {
      return "Welcome!"
    }
  }

  render() {
    if (this.props.isLoggedIn && this.props.currentUser && !this.props.showItem) {
      return (
        <div id="landing-container">
          <h5 id="welcome">{this.buildWelcomeMsg()}</h5>
          <h1 id="landing-title">What Do You Want to Look For Today?</h1>
          <Search />
        </div>
      )
    } else if (this.props.showItem){
      return (
              <ItemModal />
              )
    } else {
      const path = this.props.location.pathname.slice(1)
      return (
        <div id="form">
          {(path === 'login' ? (<LoginForm />)
            : (path === 'signup') ? (<SignUpForm />)
            : null )}
          </div>
        )
      }
    }
  }

  const mapStateToProps = (state) => {
    return {
      isLoggedIn: state.users.isLoggedIn,
      currentUser: state.users.currentUser,
      showItem: state.items.showItem,
    }
  }

  export default connect(mapStateToProps, { getUser, fetchComments })(withRouter(UserContainer))
