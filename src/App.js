import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserContainer from './containers/UserContainer'

class App extends Component {
  render() {
    <div>
      <Route path="/" render={LandingContainer} />
      <Route path="/signup" render={LandingContainer} />
      <Route path="/login" render={LandingContainer} />
      <Route path="/profile" render={LandingContainer} />
      <Route path="/next" render={ListContainer} />
      <Route path="/seen" render={ListContainer} />
      <Route path="/watching" render={ListContainer} />
      <Route path="/recommended" render={ListContainer} />
      <Route path="/friends" render={ListContainer} />
    </div>
  }
}

  export default App;
