import React from "react";
import { connect } from "react-redux";
import Search from '../components/Search'
import ItemModal from '../components/ItemModal'
import { Link, withRouter } from 'react-router-dom';
import { logIn, getUser } from '../actions/userActions'

class LandingContainer extends React.Component {
  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.getUser(localStorage.getItem('token'), this.props.history)
    }
  }

  handleDemo = () => {
    this.props.logIn('demo@example.com', 'password', this.props.history)
  }

  render() {
    if (this.props.showItem) {
      return (
        <ItemModal />
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
            <button id="demo-button" className="landing-button" onClick={this.handleDemo}>
              <Link to="/">{'demo'}</Link>
            </button>
          </div>
        </div>
      )
    }
  }
}

export default connect((state) => ({
  showItem: state.media.showItem,
  isLoggedIn: state.users.isLoggedIn
}), { logIn, getUser })(withRouter(LandingContainer))
