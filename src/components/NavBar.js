import React from 'react';
import { connect } from "react-redux";
import { setCurrentList } from '../actions/listActions'
import { logoutUser } from '../actions/userActions'
import { Link } from 'react-router-dom'

const NavBar = (props) => {
  const handleOnClick = (e) => {
    props.setCurrentList(e.target.name)
  }

  console.log("props.currentList:", props)
  return (
    <ul id="nav">
      <li><Link to="/"
                id="home"
                name="home"
                className={"nav-link " + (props.currentList === 'home' ? 'active' : null)}
                onClick={handleOnClick}>truly social media</Link></li>
      {(!localStorage.getItem('jwt')) ?
        <span>
          <li><Link to="/next"
                    name="next"
                    className={"nav-link " + (props.currentList === 'next' ? 'active' : null)}
                    onClick={handleOnClick}>next</Link></li>
          <li><Link to="/watching"
                    name="watching"
                    className={"nav-link " + (props.currentList === 'watching' ? 'active' : null)}
                    onClick={handleOnClick}>watching</Link></li>
          <li><Link to="/seen"
                    name="seen"
                    className={"nav-link " + (props.currentList === 'seen' ? 'active' : null)}
                    onClick={handleOnClick}>seen</Link></li>
          <li><Link to="/recommended"
                    name="recommended"
                    className={"nav-link " + (props.currentList === 'recommended' ? 'active' : null)}
                    onClick={handleOnClick}>recommended</Link></li>
          <li><Link to="/friends"
                    name="friends"
                    className={"nav-link " + (props.currentList === 'friends' ? 'active' : null)}
                    onClick={handleOnClick}>friends</Link></li>
          <li id="logout"><Link to="/"
                                name="logout"
                                className="nav-link"
                                onClick={props.logoutUser}>logout</Link></li>
        </span>
        : null
      }
    </ul>
  )
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.lists.isLoggedIn,
    currentList: state.lists.currentList
  }
}

export default connect(mapStateToProps, { setCurrentList, logoutUser })(NavBar)
