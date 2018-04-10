export default function commentsReducer(
  state = {
    itemChoice: null,
    showItem: false,
  },
  action
) {
  switch (action.type) {
    case 'SHOW_ITEM':
      return {...state, itemChoice: action.payload.item, showItem: true }
    case 'HIDE_ITEM':
      return {...state, itemChoice: null, showItem: false }
    default:
      return {...state};
  }
}
