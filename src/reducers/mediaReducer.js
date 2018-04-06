export default function searchReducer(
  state = {
    mediaChoice: null,
    showMedia: false,
  },
  action
) {
  switch (action.type) {
    case 'SHOW_MEDIA':
      return {...state, mediaChoice: action.payload.item, showMedia: action.payload.showMedia }
    default:
      return {...state};
  }
}
