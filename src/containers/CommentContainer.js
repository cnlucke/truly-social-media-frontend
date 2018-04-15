import React from 'react'
import { connect } from 'react-redux'
import CommentList from '../components/CommentList'
import CommentForm from '../components/CommentForm'
import { hideCommentContainer } from '../actions/commentActions'

const CommentContainer = (props) => {
  return (
    <div id="comment-modal" className="comment-modal">
      <button id="close" onClick={props.hideCommentContainer}>x</button>
      <div className='comment-content' >
        <CommentList />
        <CommentForm />
      </div>
    </div>
  )
}

export default connect(null, { hideCommentContainer })(CommentContainer)
