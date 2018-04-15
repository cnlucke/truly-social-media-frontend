import React from 'react'
import { connect } from 'react-redux'
import { seeFriendList } from '../actions/friendActions'
import { removeFriend } from '../actions/friendActions'

const Friend = (props) => {
  const handleClick = (e) => {
    props.seeFriendList(props.friend, e.target.id)
  }

  const handleRemove = () => {
    props.removeFriend(props.friend)
  }

  return (
    <div className="friend-item" id={props.id}>
      <a className="friend-link">
        <div className="friend-content">
          <div id="friend-left-col">
            <div id='friend-img'>
              <i className="fas fa-user fa-4x"></i>
            </div>
            <button className="remove-friend" onClick={handleRemove}>remove</button>
          </div>
          <div id='friend-text'>
            <span className="friend-title">
              <b>{props.friend.first_name + ' ' + props.friend.last_name}</b>
            </span>
            <p className="friend-small-title"><b>city: </b>{props.friend.city}</p>
            <p className="friend-small-title"><b>state: </b>{props.friend.state}</p>
          </div>
          <div id='friend-right-col'>
            <button className="friend-list-button" id='next' onClick={handleClick}>next</button>
            <button className="friend-list-button" id='watching' onClick={handleClick}>watching</button>
            <button className="friend-list-button" id='seen' onClick={handleClick}>seen</button>
          </div>
        </div>
      </a>
    </div>
  )
}

export default connect((state) => ({friends: state.friends.friends}), {seeFriendList, removeFriend })(Friend)
