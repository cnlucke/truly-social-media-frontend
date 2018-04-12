import React from 'react'
import { connect } from 'react-redux'
import Comment from './Comment'

const CommentList = (props) => {
  const matchingComments = props.comments.filter(comment => {
    return (comment.item_id === props.item.id) || (comment.api_id === props.item.api_id)
    })
  const comments = matchingComments.map((comment, index) => <Comment comment={comment} key={comment.id} />)

  return (
    <div id="comment-list">
      {comments}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments.comments,
    item: state.items.itemChoice
  }
}

export default connect(mapStateToProps, null)(CommentList)
