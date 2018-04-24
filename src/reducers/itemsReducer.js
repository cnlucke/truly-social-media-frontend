export default function itemsReducer(
  state = {
    itemChoice: null, //which item user wants to look at
    showItem: false, //should the item modal be visible?
    friendsWithItem: [], //lists of friends' list entries for each item
  },
  action
) {
  switch (action.type) {
    case 'SHOW_ITEM':
      return {...state, itemChoice: action.payload.item, showItem: true }
    case 'HIDE_ITEM':
      return {...state, itemChoice: null, showItem: false }
    case 'LOGOUT_USER':
      return {...state, itemChoice: null, showItem: false }
    case 'FRIENDS_WITH_ITEM':
      return {...state, friendsWithItem: [...state.friendsWithItem, action.payload] }
    default:
      return {...state};
  }
}
