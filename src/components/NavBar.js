import React from 'react';
import { connect } from "react-redux";
import { setCurrentList } from '../actions/listActions'
import { logoutUser } from '../actions/userActions'
import { hideitemChoice } from '../actions/itemActions'
import { Link } from 'react-router-dom'

const NavBar = (props) => {

  const handleOnClick = (list) => {
    props.setCurrentList(list)
    props.hideitemChoice()
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
                      <i className="fas fa-step-forward fa-lg" color='black'></i> next
                  </Link></li>
            <li><Link to="/watching"
                      name="watching"
                      className={"nav-link nav-lists " + (props.currentList === 'watching' ? 'active' : null)}
                      onClick={() => handleOnClick('watching')}>
                      <i className="fas fa-eye fa-lg" color='black'></i> watching
                    </Link></li>
            <li><Link to="/seen"
                      name="seen"
                      className={"nav-link nav-lists " + (props.currentList === 'seen' ? 'active' : null)}
                      onClick={() => handleOnClick('seen')}>
                      <i className="fas fa-step-backward fa-lg" color='black'></i> seen
                    </Link></li>
            <li><Link to="/recommended"
                      name="recommended"
                      className={"nav-link nav-recommended " + (props.currentList === 'recommended' ? 'active' : null)}
                      onClick={() => handleOnClick('recommended')}>
                      <i className="fas fa-thumbs-up fa-lg" color="black"></i> recommended
                    </Link></li>
            <li><Link to="/friends"
                      name="friends"
                      className={"nav-link nav-lists " + (props.currentList === 'friends' ? 'active' : null)}
                      onClick={() => handleOnClick('friends')}>
                      <i className="fas fa-users fa-lg" color='black'></i> friends
                    </Link></li>
            <li id="logout"><Link to="/"
                                  name="logout"
                                  className="nav-link" id="logout"
                                  onClick={props.logoutUser}>
                                  <i className="fas fa-sign-out-alt fa-lg" color="black"></i> logout
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
    currentList: state.lists.currentList,
  }
}

export default connect(mapStateToProps, { setCurrentList, logoutUser, hideitemChoice })(NavBar)
