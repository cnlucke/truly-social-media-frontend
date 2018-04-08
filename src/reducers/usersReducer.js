export default function usersReducer(
  state = {
    currentUser: {},
    isLoggedIn: false,
    currentUserLists: [],
  },
  action
) {
  switch (action.type) {
    case 'LOGOUT_USER':
      return {...state, isLoggedIn: false, currentUser: {} }
    case 'LOGIN_USER':
      return {...state, isLoggedIn: true, currentUser: action.payload.user, currentUserLists: action.payload.lists }
    default:
      return state;
  }
}
