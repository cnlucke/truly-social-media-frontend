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
        console.log("default switch case handling socket response:", data);
    }
  };

  return (
    <div id="comment-modal" className="comment-modal">
      <ActionCable
        channel={{ channel: 'CommentsChannel', api_id: props.itemChoice.api_id}}
        onReceived={handleSocketResponse}
        />
      <button id="close" onClick={props.hideCommentContainer}>x</button>
      <div className='comment-content' >
        <CommentList />
        <CommentForm />
      </div>
    </div>
  )
}

export default connect(state => ({itemChoice: state.items.itemChoice}), { hideCommentContainer, addComment })(CommentContainer)
