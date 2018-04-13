import React from 'react'
import { connect } from 'react-redux'
import { hideitemChoice } from '../actions/itemActions'
import { addToList } from '../actions/listActions'
import { showCommentContainer } from '../actions/commentActions'
import { withRouter } from 'react-router-dom'
import CommentContainer from '../containers/CommentContainer'

const ItemModal = (props) => {
  const url = (props.itemChoice.poster_url) ? props.itemChoice.poster_url : require('../default.jpeg')

  const handleClick = (list) => {
    props.addToList(list, props.itemChoice, props.history)
  }

  if (props.showItem) {
    return (
      <div id="modal-container">
        <div id="movie-modal" className="modal">
          <button id="close" onClick={props.hideitemChoice}>x</button>
          <div className='item-content' >
            <div id="movie-poster">
              <img src={url} alt="movie poster"/>
            </div>
            <p>{props.itemChoice.overview}</p>
            <p><b>genres:</b> {props.itemChoice.genres}</p>
            <p><b>release date:</b> {props.itemChoice.date}</p>
            <div>
              {(props.showComments) ? null :
                <button id="show-comments" onClick={props.showCommentContainer}>comments</button>
              }
            </div>
          </div>
          <div id="button-container">
            <button className="add-buttons" id="add-nextlist" onClick={() => handleClick('next')}>
              <i className="fas fa-plus fa-sm"></i><br/>
               add to next
            </button>
            <button className="add-buttons" id="add-watchinglist" onClick={() => handleClick('watching')}>
              <i className="fas fa-plus fa-sm"></i><br/>
               add to watching
            </button>
            <button className="add-buttons" id="add-seenlist" onClick={() => handleClick('seen')}>
              <i className="fas fa-plus fa-sm"></i><br/>
               add to seen
            </button>
          </div>
        </div>
        {(props.showComments) ? <CommentContainer /> : null}
      </div>
    )
  }
}


export default connect(state => ({
  itemChoice: state.items.itemChoice,
  showItem: state.items.showItem,
  list: state.lists.currentList,
  showComments: state.comments.showCommentContainer
}), { hideitemChoice, addToList, showCommentContainer })(withRouter(ItemModal))


 //       <img src={url} className="movie-poster" alt="movie poster"/>
 // <div className="modal-content" style ={ { backgroundImage: "url("+url+")" } }></div>