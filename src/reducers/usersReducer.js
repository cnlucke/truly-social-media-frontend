export default function usersReducer(
  state = {
    user: {},
    isLoggedIn: false,
  },
  action
) {
  switch (action.type) {
    case 'LOGOUT_USER':
      return {...state, isLoggedIn: false }
    case 'LOGIN_USER':
      return {...state, isLoggedIn: true}
    default:
      return state;
  }
}
