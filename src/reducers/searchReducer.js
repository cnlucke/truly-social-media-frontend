export default function searchReducer(
  state = {
    searchResults: [],
    genres: [],
    mediaChoice: null,
  },
  action
) {
  switch (action.type) {
    case 'SET_GENRES':
      return {...state, genres: action.payload}
    case 'LOAD_RESULTS':
      return {...state, searchResults: action.payload}
    case 'SHOW_MEDIA_CHOICE':
      return {...state, mediaChoice: action.payload}
    default:
      return state;
  }
}
