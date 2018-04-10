import React from 'react'
import { connect } from 'react-redux'
import { hideCommentContainer } from '../actions/commentActions'
import CommentForm from '../components/CommentForm'
import CommentList from '../components/CommentList'

const CommentContainer = (props) => {
  const inList = itemInAnyList([...props.next, ...props.watching, ...props.seen], props.itemChoice)
  console.log("inList?", inList)
  if (props.showCommentContainer && props.isLoggedIn && inList) {
    return (
      <div id="comment-modal" className="modal">
        <button id="close" onClick={props.hideCommentContainer}>x</button>
        <div className='jcomment-content' >
          <CommentList />
          <CommentForm />
        </div>
      </div>
    )
  }
}

const itemInAnyList = (lists, itemChoice) => {
  return lists.filter(item => item.api_id === itemChoice.api_id).length > 0;
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
