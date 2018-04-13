import React from 'react'
import { connect } from 'react-redux'
import { hideFriendChoice } from '../actions/friendActions'
import { addFriend } from '../actions/friendActions'
import { withRouter } from 'react-router-dom'

const FriendModal = (props) => {
  const handleClick = () => {
    props.addFriend(props.friendChoice)
  }

  if (props.showFriend) {
    return (
      <div id="modal-container">
        <div id="friend-modal" className="modal">
          <button id="close" onClick={props.hideFriendChoice}>x</button>
          <div className='item-content' >
            <div id="movie-poster">
              <i className="fas fa-user-plus fa-5x"></i>
            </div>
            <p>{props.friendChoice.first_name + ' ' + props.friendChoice.last_name}</p>
            <p><b>city:</b> {props.friendChoice.city}</p>
            <p><b>state:</b> {props.friendChoice.state}</p>
          </div>
          <div id="button-container">
            <button className="add-buttons" id="add-friend-button" onClick={handleClick}>
              <i className="fas fa-plus fa-sm"></i><br/>
               add friend
            </button>
          </div>
        </div>
      </div>
    )
  }
}


export default connect(state => ({
  friendChoice: state.friends.friendChoice,
  showFriend: state.friends.showFriend,
  list: state.lists.currentList,
  showComments: state.comments.showCommentContainer
}), { hideFriendChoice, addFriend })(withRouter(FriendModal))


 //       <img src={url} className="movie-poster" alt="movie poster"/>
 // <div className="modal-content" style ={ { backgroundImage: "url("+url+")" } }></div>
