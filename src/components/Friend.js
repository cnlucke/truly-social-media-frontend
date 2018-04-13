import React from 'react'
import { connect } from 'react-redux'
import { showFriendChoice } from '../actions/friendActions'
import { removeFriend } from '../actions/friendActions'

const Friend = (props) => {
  const handleChoice = () => {
    props.showFriendChoice(props.friend)
  }

  const handleRemove = () => {
    props.removeFriend(props.friend)
  }

  return (
    <div className="friend-item" id={props.id}>
      <a className="friend-link">
        <div className="friend-content">
          <div id="friend-left-col">
            <div id='friend-img' onClick={handleChoice}>
              <i className="fas fa-user fa-4x"></i>
            </div>
            <button className="remove-friend" onClick={handleRemove}>remove</button>
          </div>
          <div id='friend-text' onClick={handleChoice}>
            <span className="friend-title" style={{textAlign: 'left'}}>
              <b>{props.friend.first_name + ' ' + props.friend.last_name}</b>
            </span>
            <p className="friend-small-title" onClick={handleChoice}><b>city: </b>{props.friend.city}</p>
            <p className="friend-small-title" onClick={handleChoice}><b>state: </b>{props.friend.state}</p>
          </div>
        </div>
      </a>
    </div>
  )
}

export default connect((state) => ({friends: state.friends.friends}), {showFriendChoice, removeFriend })(Friend)
