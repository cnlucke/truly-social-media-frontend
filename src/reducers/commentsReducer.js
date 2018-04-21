export default function commentsReducer(
  state = {
    showCommentContainer: false, //whether the comments should be shown
    comments: [], //all friend and friend-of-friend comments
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
      return {...state, comments: [...state.comments, action.payload] }
    default:
      return {...state};
  }
}
