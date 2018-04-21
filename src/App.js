import React, { Component } from 'react';
import './App.css';
import { Route, Redirect } from 'react-router-dom';
import LandingContainer from './containers/LandingContainer'
import ListContainer from './containers/ListContainer'
import UserContainer from './containers/UserContainer'
import ProfileForm from './components/ProfileForm'
import NavBar from './components/NavBar'
import { connect } from "react-redux";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Route exact path="/" render={() => (
          this.props.isLoggedIn ? (<UserContainer/>) : (<LandingContainer/>)
        )} />
        <Route exact path="/login" component={UserContainer} />
        <Route exact path="/signup" component={UserContainer} />
        <Route exact path="/profile" render={() => (
          (this.props.isLoggedIn && this.props.currentList === 'profile') ? (<ProfileForm/>) : (<Redirect to='/'/>)
        )} />
        <Route exact path="/next" render={() => (
          (this.props.isLoggedIn && this.props.currentList === 'next') ? (<ListContainer/>) : (<Redirect to='/'/>)
        )} />
        <Route exact path="/seen" render={() => (
          (this.props.isLoggedIn && this.props.currentList === 'seen')  ? (<ListContainer/>) : (<Redirect to='/'/>)
        )} />
        <Route exact path="/watching" render={() => (
          (this.props.isLoggedIn && this.props.currentList === 'watching')  ? (<ListContainer/>) : (<Redirect to='/'/>)
        )} />
        <Route exact path="/recommended" render={() => (
          (this.props.isLoggedIn && this.props.currentList === 'recommended')  ? (<ListContainer/>) : (<Redirect to='/'/>)
        )} />
        <Route exact path="/friends" render={() => (
          (this.props.isLoggedIn && this.props.currentList === 'friends')  ? (<ListContainer/>) : (<Redirect to='/'/>)
        )} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.users.isLoggedIn,
    currentList: state.lists.currentList,
  }
}

export default connect(mapStateToProps, null)(App)
