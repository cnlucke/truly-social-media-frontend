export default function usersReducer(
  state = {
    currentUser: {},
    isLoggedIn: false,
    // userProfileChoice: {},
    showProfile: false,
  },
  action
) {
  switch (action.type) {
    case 'LOGOUT_USER':
      return {...state, isLoggedIn: false, currentUser: {} }
    case 'LOGIN_USER':
      return {...state, isLoggedIn: true, currentUser: action.payload.user }
    // case 'SET_PROFILE':
    //   return {...state, userProfileChoice: action.payload }
    case 'UPDATE_USER':
      return {...state, currentUser: action.payload }
    default:
      return state;
  }
}
