export default function searchReducer(
  state = {
    mediaChoice: null,
    showMedia: false,
  },
  action
) {
  switch (action.type) {
    case 'SHOW_MEDIA':
      return {...state, mediaChoice: action.payload.item, showMedia: true }
    case 'HIDE_MEDIA':
      return {...state, mediaChoice: null, showMedia: false }
    default:
      return {...state};
  }
}
