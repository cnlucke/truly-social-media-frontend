export default function usersReducer(
  state = {
    currentUser: { first_name: "Cristy" },
    isLoggedIn: true,
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
