import React from "react";
import { connect } from "react-redux";
import LoginForm from '../components/LoginForm'
import ProfileForm from '../components/ProfileForm'
import ItemModal from '../components/ItemModal'
import Search from '../components/Search'
import { getUser } from '../actions/userActions'
import { fetchComments } from '../actions/commentActions'
import { withRouter } from 'react-router-dom'
import CommentContainer from './CommentContainer'

class UserContainer extends React.Component {
  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.getUser();
      this.props.fetchComments();
    }
  }

  itemInAnyList = () => {
    return this.props.all.filter(item => parseInt(item.api_id, 10) === parseInt(this.props.itemChoice.api_id, 10)).length > 0;
  }

  render() {
    if (this.props.isLoggedIn && this.props.currentUser && !this.props.showItem) {
      return (
        <div id="landing-container">
          <h1 id="landing-title">What Do You Want to Look For Today?</h1>
          <Search />
        </div>
      )
    } else if (this.props.showItem) {
      return (
        <div id="modal-container">
          <ItemModal />
          {(this.props.showComments && this.props.isLoggedIn && this.itemInAnyList()) ?
            (<CommentContainer />) : null}
        </div>
      )
    } else {
      const path = this.props.location.pathname.slice(1)
      return (
        <div id="form">
          {(path === 'login' ? (<LoginForm />)
            : (path === 'signup') ? (<ProfileForm />)
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
      showComments: state.comments.showCommentContainer,
      itemChoice: state.items.itemChoice,
      all: state.lists.all,
    }
  }

  export default connect(mapStateToProps, { getUser, fetchComments })(withRouter(UserContainer))
