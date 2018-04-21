export default function friendsReducer(
  //remember these lists are the *friend's* lists, not the current users
  state = {
    all_users: [], //ability to search for new friends
    friends: [], //current user's friends
    friendRatings: [], //current user's friends' ratings
    friendSearchTerm: '', //used to filter friends and search amongst all friends
    friendSearchResults: [], //which friends match friendSearchTerm
    friendChoice: null, //friend modal you are viewing with option to add friend
    showFriend: false, //ability to view friend modal
    friendProfile: null, //which friend's list you are currently viewing
    next: [], //current friend's, set on 'SEE_FRIEND'
    watching: [], //current friend's, set on 'SEE_FRIEND'
    seen: [], //current friend's, set on 'SEE_FRIEND'
    seeFriend: null, //boolean flag on whether to show friend list in FriendList/List
    currentFriendList: null, //string showing friend list type in FriendList/List
  },
  action
) {
  switch (action.type) {
    case 'LOGIN_USER':
      return {...state, friends: action.payload.friends, friendRatings: action.payload.friend_ratings, all_users: action.payload.all_users }
    case 'GET_USERS':
      return {...state, all_users: action.payload.all_users }
    case 'GET_FRIENDS':
      return {...state, friends: action.payload }
    case 'ADD_FRIEND':
      if (state.friends.filter(friend => friend.id === action.payload.id).length > 0) {
        return state;
      } else {
        return {...state, friends: [...state.friends, action.payload], friendChoice: null, showFriend: false }
      }
    case 'REMOVE_FRIEND':
      return {...state, friends: state.friends.filter(friend => friend.id !== action.payload.id) }
    case 'CLEAR_RESULTS':
      return {...state, friendSearchResults: [], friendSearchTerm: ''}
    case 'SET_RESULTS':
      return {...state, friendSearchResults: action.payload}
    case 'SET_FRIEND_SEARCH_TERM':
      return {...state, friendSearchTerm: action.payload}
    case 'SHOW_FRIEND':
      return {...state, friendChoice: action.payload, showFriend: true }
    case 'HIDE_FRIEND':
      return {...state, friendChoice: null, showFriend: false }
    case 'SEE_FRIEND':
      const {user, next, watching, seen, ratings, list} = action.payload
      return {...state, next, watching, seen, friendProfile: user, currentFriendList: list, seeFriend: true, friendRatings: ratings}
    case 'HIDE_FRIEND_LIST':
      return {...state, seeFriend: false}
    case 'SORT_FRIEND_LIST':
      return {...state, [action.payload.listType]: action.payload.list}
    default:
      return state;
  }
}
