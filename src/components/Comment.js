import React from 'react'
import { connect } from 'react-redux'

const Comment = (props) => {
  return (
    <div className="comment">
      <div className="comment-text">
        <b className="comment-name">{props.comment.username}</b>
        <span className="comment-content">{props.comment.content}</span>
      </div>
      <small id="timestamp">{props.comment.timestamp}</small>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
  }
}
export default connect(mapStateToProps, null)(Comment)
