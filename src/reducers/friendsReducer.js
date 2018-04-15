export default function usersReducer(
  state = {
    all_users: [],
    friends: [],
    friendSearchTerm: '',
    friendSearchResults: [],
    friendChoice: null,
    showFriend: false,
    friendProfile: null,
    next: [],
    watching: [],
    seen: [],
    seeFriend: null,
    seeFriendList: null,
  },
  action
) {
  switch (action.type) {
    case 'GET_USERS':
      return {...state, all_users: action.payload.all_users }
    case 'GET_FRIENDS':
      return {...state, friends: action.payload }
    case 'ADD_FRIEND':
      if (state.friends.filter(friend => friend.id === action.payload.id).length > 0) {
        return state;
      } else {
        return {...state, friends: [...state.friends, action.payload] }
      }
    case 'REMOVE_FRIEND':
      return {...state, friends: state.friends.filter(friend => friend.id !== action.payload.id) }
    case 'CLEAR_RESULTS':
      return {...state, friendSearchResults: []}
    case 'SET_RESULTS':
      return {...state, friendSearchResults: action.payload}
    case 'SET_FRIEND_SEARCH_TERM':
      return {...state, friendSearchTerm: action.payload}
    case 'SHOW_FRIEND':
      return {...state, friendChoice: action.payload, showFriend: true }
    case 'HIDE_FRIEND':
      return {...state, friendChoice: null, showFriend: false }
    case 'SEE_FRIEND':
      const {user, next, watching, seen, list} = action.payload
      return {...state, friendProfile: user, next: next, watching: watching, seen: seen, seeFriendList: list, seeFriend: true}
    case 'HIDE_FRIEND_LIST':
      return {...state, seeFriend: false}
    default:
      return state;
  }
}
