import React from 'react'
import { connect } from 'react-redux'
import CommentList from '../components/CommentList'
import CommentForm from '../components/CommentForm'
import { hideCommentContainer } from '../actions/commentActions'
import { addComment } from '../actions/commentActions'
import { ActionCable } from 'react-actioncable-provider';

const CommentContainer = (props) => {
  const handleSocketResponse = data => {
    switch (data.type) {
      case 'ADD_COMMENT':
       		props.addComment(data.payload)
       		break;
      default:
        console.log(data);
    }
  };

  return (
    <div>
    <ActionCable
          channel={{ channel: 'CommentsChannel', item_id: props.itemChoice.id}}
          onReceived={handleSocketResponse}
        />
    <div id="comment-modal" className="comment-modal">
      <button id="close" onClick={props.hideCommentContainer}>x</button>
      <div className='comment-content' >
        <CommentList />
        <CommentForm />
      </div>
    </div>
  </div>
  )
}

export default connect(state => ({itemChoice: state.items.itemChoice}), { hideCommentContainer, addComment })(CommentContainer)
