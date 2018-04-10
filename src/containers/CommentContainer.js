import React from 'react'
import { connect } from 'react-redux'
import Comment from '../components/Comment'

const CommentContainer = (props) => {
  return (
    <div id="movie-modal" className="modal">
      <button id="close" onClick={props.hideitemChoice}>x</button>
      <div className='item-content' >
        <p>comments</p>
      </div>
    </div>
  )
}

export default connect(null, null)(CommentContainer)
