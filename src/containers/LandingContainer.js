import React from "react";
import { connect } from "react-redux";
import Search from '../components/Search'
import ItemModal from '../components/ItemModal'
import { Link, withRouter } from 'react-router-dom';
import { logIn, getUser } from '../actions/userActions'
import CommentContainer from '../containers/CommentContainer'

class LandingContainer extends React.Component {
  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.getUser()
    }
  }

  handleDemo = () => {
    this.props.logIn('demo@example.com', 'red', this.props.history)
  }

  itemInAnyList = () => {
    return this.props.all.filter(item => parseInt(item.api_id, 10) === parseInt(this.props.itemChoice.api_id, 10)).length > 0;
  }

  render() {
    if (this.props.showItem) {
      return (
      <div id="modal-container">
        <ItemModal />
        {(this.props.showComments && this.props.isLoggedIn && this.itemInAnyList()) ? null :
          (<CommentContainer />)}
        </div>
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
  showItem: state.items.showItem,
  itemChoice: state.items.itemChoice,
  showComments: state.comments.showCommentContainer,
  isLoggedIn: state.users.isLoggedIn,
  all: state.lists.all,
}), { logIn, getUser })(withRouter(LandingContainer))
