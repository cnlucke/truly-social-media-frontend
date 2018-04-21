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

  const formatDate = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime + ' ' + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
  }

  return (
    <div className="comment">
      <div className="comment-text">
        <b className="comment-name" onClick={handleNameClick}>{props.comment.username}</b>
        <span className="comment-content">{props.comment.content}</span>
      </div>
      <small id="timestamp">{formatDate(new Date(props.comment.timestamp))}</small>
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
