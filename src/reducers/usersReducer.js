export default function usersReducer(
  state = {
    currentUser: { first_name: "Cristy" },
    isLoggedIn: false,
  },
  action
) {
  switch (action.type) {
    case 'LOGOUT_USER':
      return {...state, isLoggedIn: false, currentUser: {} }
    case 'LOGIN_USER':
      return {...state, isLoggedIn: true, currentUser: { first_name: 'Cristy'}}
    case 'DEMO':
      return {...state, isLoggedIn: true, currentUser: { first_name: 'demo'}}
    default:
      return state;
  }
}
