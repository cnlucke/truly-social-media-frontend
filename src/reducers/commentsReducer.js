export default function commentsReducer(
  state = {
    showCommentContainer: true,
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
      const username = action.payload.user.first_name + ' ' + action.payload.user.last_name
      const newComment = {...action.payload.comment, username}
      return {...state, comments: [...state.comments, newComment] }
    default:
      return {...state};
  }
}
