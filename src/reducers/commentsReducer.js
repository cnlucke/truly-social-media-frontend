export default function commentsReducer(
  state = {
    showCommentContainer: false,
    comments: [],
  },
  action
) {
  switch (action.type) {
    case 'SHOW_COMMENT_CONTAINER':
      return {...state, showCommentContainer: true }
    case 'HIDE_COMMENT_CONTAINER':
      return {...state, showCommentContainer: false }
    case 'SHOW_ITEM':
      return {...state, showCommentContainer: true }
    case 'HIDE_ITEM':
      return {...state, showCommentContainer: false }
    case 'GET_COMMENTS':
      return {...state, comments: action.payload}
    case 'ADD_COMMENT':
      const newComment = {...action.payload, username: action.payload.username}
      return {...state, comments: [...state.comments, newComment] }
    default:
      return {...state};
  }
}
