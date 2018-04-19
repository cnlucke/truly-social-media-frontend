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
                        <i className="far fa-fast-forward fa-lg" color='black'></i>
                      </div>
                      next
                  </Link></li>
            <li><Link to="/watching"
                      name="watching"
                      className={"nav-link nav-lists " + (props.currentList === 'watching' ? 'active' : null)}
                      onClick={() => handleOnClick('watching')}>
                      <div className="icon">
                        <i className="fal fa-eye fa-lg" color='black'></i>
                      </div>
                      watching
                    </Link></li>
            <li><Link to="/seen"
                      name="seen"
                      className={"nav-link nav-lists " + (props.currentList === 'seen' ? 'active' : null)}
                      onClick={() => handleOnClick('seen')}>
                      <div className="icon">
                        <i className="far fa-fast-backward fa-lg" color='black'></i>
                      </div>
                      seen
                    </Link></li>
            <li><Link to="/recommended"
                      name="recommended"
                      id='recommended'
                      className={"nav-link nav-recommended " + (props.currentList === 'recommended' ? 'active' : null)}
                      onClick={() => handleOnClick('recommended')}>
                      <div className="icon">
                        <i className="far fa-thumbs-up fa-lg" color="black"></i>
                      </div>
                      recommended
                    </Link></li>
            <li><Link to="/friends"
                      name="friends"
                      className={"nav-link nav-lists " + (props.currentList === 'friends' ? 'active' : null)}
                      onClick={() => handleOnClick('friends')}>
                      <div className="icon">
                        <i className="far fa-users fa-lg" color='black'></i>
                      </div>
                      friends
                    </Link>
            </li>
            <li id='welcome'>{buildWelcomeMsg()}</li>
            <li className="dropdown">
              <span><i className="far fa-user-circle fa-3x"></i></span>
              <div className="dropdown-content">
                <Link className="dropdown-item" to="/" name="logout" onClick={props.logoutUser}>logout</Link>
                <Link className="dropdown-item" to="/profile" name="profile" onClick={() => handleOnClick('profile')}>profile</Link>
              </div>
            </li>
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

// <div className="dropdown">
//   <span>Mouse over me</span>
//   <div className="dropdown-content">
//     <p>Hello World!</p>
//   </div>
// </div>
