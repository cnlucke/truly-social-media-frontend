export default function listsReducer(
  state = {
    currentList: "",
    isLoggedIn: false,
  },
  action
) {
  switch (action.type) {
    case 'SET_CURRENT_LIST':
      return {...state, currentList: action.payload}
    case 'LOGOUT_USER':
      return {...state, isLoggedIn: false }
    case 'LOGIN_USER':
      return {...state, isLoggedIn: true}
    default:
      return state;
  }
}
