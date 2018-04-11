import React from 'react'
import { connect } from 'react-redux'
import { hideCommentContainer } from '../actions/commentActions'
import CommentForm from '../components/CommentForm'
import CommentList from '../components/CommentList'

const CommentContainer = (props) => {
  const inList = itemInAnyList([...props.next, ...props.watching, ...props.seen], props.itemChoice)

  if (props.showCommentContainer && props.isLoggedIn && inList) {
    return (
      <div id="comment-modal" className="comment-modal">
        <button id="close" onClick={props.hideCommentContainer}>x</button>
        <div className='comment-content' >
          <CommentList />
          <CommentForm />
        </div>
      </div>
    )
  } else {
    return null
  }
}

const itemInAnyList = (lists, itemChoice) => {
  return lists.filter(item => parseInt(item.api_id, 10) === parseInt(itemChoice.api_id, 10)).length > 0;
}

export default connect(state => ({
  itemChoice: state.items.itemChoice,
  isLoggedIn: state.users.isLoggedIn,
  next: state.lists.next,
  watching: state.lists.watching,
  seen: state.lists.seen,
  showCommentContainer: state.comments.showCommentContainer,
  list: state.lists.currentList
}), { hideCommentContainer })(CommentContainer)


 // <div>
 //   <p id="comments-title">comments</p>
 // </div>
