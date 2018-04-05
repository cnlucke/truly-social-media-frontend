export default function searchReducer(
  state = {
    searchTerm: '',
  },
  action
) {
  switch (action.type) {
    case 'UPDATE_SEARCH_TERM':
    default:
      return state;
  }
}
