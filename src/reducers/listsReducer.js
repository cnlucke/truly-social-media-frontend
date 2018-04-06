export default function listsReducer(
  state = {
    currentList: "",
  },
  action
) {
  switch (action.type) {
    case 'SET_CURRENT_LIST':
      return {...state, currentList: action.payload}
    default:
      return state;
  }
}
