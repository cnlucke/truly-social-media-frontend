export default function listsReducer(
  state = {
    currentList: "home",
    all: [],
    next: [],
    watching: [],
    seen: [],
    recommended: [],
    friends: [],
  },
  action
) {
  switch (action.type) {
    case 'SET_CURRENT_LIST':
      return {...state, currentList: action.payload}
    case 'LOGOUT_USER':
      return {...state, next: [], watching: [], seen: [], all: [] }
    case 'LOGIN_USER':
      const {next, watching, seen} = action.payload
      return {...state, next: next, watching: watching, seen: seen, all: [...next, ...watching, ...seen] }
    case 'ADD_ITEM_TO_LIST':
      if (state[action.payload.list].filter(item => action.payload.item.id === item.id).length === 0) {
        return {...state, [action.payload.list]: [...state[action.payload.list], action.payload.item]}
      } else {
        return {...state};
      }
    case 'REMOVE_ITEM_FROM_LIST':
      return {...state, [action.payload.list]: state[action.payload.list].filter(item => item !== action.payload.item)}
    case 'RATE_ITEM':
      // Update item:
      const updatedItemList = state.seen.map(item => {
        if (item.id === action.payload.item_id) {
          return {...item, rating: action.payload.rating}
        } else {
          return item
        }
      })
      return {...state, seen: updatedItemList}
    case 'SORT_LIST':
      return {...state, [action.payload.listType]: action.payload.list}
    default:
      return {...state};
  }
}
