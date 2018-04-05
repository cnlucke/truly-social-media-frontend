import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import LandingContainer from './containers/LandingContainer'
import ListContainer from './containers/ListContainer'
import UserContainer from './containers/UserContainer'
import NavBar from './components/NavBar'
import { connect } from "react-redux";

class App extends Component {
  render() {
    console.log("App props:", this.props.isLoggedIn)
    return (
      <div>
        <NavBar/>
        <Route exact path="/" render={() => (
          this.props.isLoggedIn ? (<UserContainer/>) : (<LandingContainer/>)
        )} />
        <Route exact path="/signup" render={() => (
          this.props.isLoggedIn ? (<UserContainer/>) : (<LandingContainer/>)
        )} />
        <Route exact path="/login" render={() => (
          this.props.isLoggedIn ? (<UserContainer/>) : (<LandingContainer/>)
        )} />
        <Route exact path="/profile" render={() => (
          this.props.isLoggedIn ? (<UserContainer/>) : (<LandingContainer/>)
        )} />
        <Route exact path="/next" render={() => (
          this.props.isLoggedIn ? (<ListContainer/>) : (<LandingContainer/>)
        )} />
        <Route exact path="/seen" render={() => (
          this.props.isLoggedIn ? (<ListContainer/>) : (<LandingContainer/>)
        )} />
        <Route exact path="/watching" render={() => (
          this.props.isLoggedIn ? (<ListContainer/>) : (<LandingContainer/>)
        )} />
        <Route exact path="/recommended" render={() => (
          this.props.isLoggedIn ? (<ListContainer/>) : (<LandingContainer/>)
        )} />
        <Route exact path="/friends" render={() => (
          this.props.isLoggedIn ? (<ListContainer/>) : (<LandingContainer/>)
        )} />
      </div>
    )
  }
}

export default connect((state) => ({isLoggedIn: state.users.isLoggedIn}), null)(App)
