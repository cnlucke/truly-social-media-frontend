import React from 'react'
import { connect } from 'react-redux'

const Comment = (props) => {
  const handleNameClick = () => {
    let friend;
    // show <Friend friend={friend} key={friend.id} /> on click -- will need a flag
    if (props.comment.user_id === props.currentUser.id) {
      friend = props.currentUser
    } else {
      friend = props.all_users.find(u => u.id === props.comment.user_id)
    }
    console.log("friend:", friend)
  }

  return (
    <div className="comment">
      <div className="comment-text">
        <b className="comment-name" onClick={handleNameClick}>{props.comment.username}</b>
        <span className="comment-content">{props.comment.content}</span>
      </div>
      <small id="timestamp">{props.comment.timestamp}</small>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    all_users: state.friends.all_users,
  }
}
export default connect(mapStateToProps, null)(Comment)
