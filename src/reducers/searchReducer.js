export default function searchReducer(
  state = {
    searchResults: [],
    genres: [],
    itemChoice: null,
  },
  action
) {
  switch (action.type) {
    case 'SET_GENRES':
      return {...state, genres: action.payload}
    case 'LOAD_RESULTS':
      return {...state, searchResults: action.payload}
    case 'SHOW_ITEM_CHOICE':
      return {...state, itemChoice: action.payload}
    case 'CLEAR_RESULTS':
      return {...state, searchResults: []}
    default:
      return state;
  }
}
