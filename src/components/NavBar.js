import React from 'react';
import { connect } from "react-redux";
import { setCurrentList } from '../actions/listActions'
import { logoutUser } from '../actions/userActions'
import { setUserProfileChoice } from '../actions/userActions'
import { hideitemChoice } from '../actions/itemActions'
import { hideFriendChoice } from '../actions/friendActions'
import { hideFriendList } from '../actions/friendActions'
import { Link } from 'react-router-dom'

const NavBar = (props) => {

  const buildWelcomeMsg = () => {
    if (props.currentUser) {
      return (props.currentUser.email === 'demo@example.com') ? 'Welcome to the Demo!'
                          : `Welcome, ${props.currentUser.first_name}!`
    } else {
      return "Welcome!"
    }
  }

  const handleOnClick = (list) => {
    props.setCurrentList(list)
    props.hideitemChoice()
    props.hideFriendChoice()
    props.hideFriendList()
    if (list === 'profile') {
      props.setUserProfileChoice(props.currentUser)
    }
  }

  return (
    <ul id="nav">
      <li><Link to="/"
                id="home"
                name="home"
                className={"nav-link " + (props.currentList === 'home' ? 'active' : null)}
                onClick={() => handleOnClick('home')}>truly social media</Link></li>
        {(props.isLoggedIn) ?
          <span>
            <li><Link to="/next"
                      name="next"
                      className={"nav-link nav-lists " + (props.currentList === 'next' ? 'active' : null)}
                      onClick={() => handleOnClick('next')}>
                      <div className="icon">
                        <i className="fas fa-step-forward fa-lg" color='black'></i>
                      </div>
                      next
                  </Link></li>
            <li><Link to="/watching"
                      name="watching"
                      className={"nav-link nav-lists " + (props.currentList === 'watching' ? 'active' : null)}
                      onClick={() => handleOnClick('watching')}>
                      <div className="icon">
                        <i className="fas fa-eye fa-lg" color='black'></i>
                      </div>
                      watching
                    </Link></li>
            <li><Link to="/seen"
                      name="seen"
                      className={"nav-link nav-lists " + (props.currentList === 'seen' ? 'active' : null)}
                      onClick={() => handleOnClick('seen')}>
                      <div className="icon">
                        <i className="fas fa-step-backward fa-lg" color='black'></i>
                      </div>
                      seen
                    </Link></li>
            <li><Link to="/recommended"
                      name="recommended"
                      id='recommended'
                      className={"nav-link nav-recommended " + (props.currentList === 'recommended' ? 'active' : null)}
                      onClick={() => handleOnClick('recommended')}>
                      <div className="icon">
                        <i className="fas fa-thumbs-up fa-lg" color="black"></i>
                      </div>
                      recommended
                    </Link></li>
            <li><Link to="/friends"
                      name="friends"
                      className={"nav-link nav-lists " + (props.currentList === 'friends' ? 'active' : null)}
                      onClick={() => handleOnClick('friends')}>
                      <div className="icon">
                        <i className="fas fa-users fa-lg" color='black'></i>
                      </div>
                      friends
                    </Link></li>
            <li id="logout"><Link to="/"
                                  name="logout"
                                  className="nav-link nav-lists"
                                  id="logout"
                                  onClick={props.logoutUser}>
                                  <div id='logout-icon' className="icon">
                                    <i className="fas fa-sign-out-alt fa-lg" color="black"></i>
                                  </div>
                                  logout
                                </Link></li>
            <li id="profile"><Link to="/profile"
                      name="profile"
                      className="nav-link nav-lists"
                      id="profile"
                      onClick={() => handleOnClick('profile')}>
                      {buildWelcomeMsg()}
                    </Link></li>
          </span>
          : null
        }
    </ul>
  )
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.users.isLoggedIn,
    currentUser: state.users.currentUser,
    currentList: state.lists.currentList,
  }
}

export default connect(mapStateToProps, { setCurrentList, logoutUser, hideitemChoice, hideFriendChoice, setUserProfileChoice, hideFriendList })(NavBar)
