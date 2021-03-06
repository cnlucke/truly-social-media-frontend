export default function listsReducer(
  state = {
    currentList: "home", //which user list is currently being viewed
    all: [], // next, watching, and seen lists merged for seeing if an item is in any list
    next: [], //current user's list of items they want to watch next
    watching: [], //current user's list of items they're currently watching
    seen: [], //current user's list of items they've already seen
    ratings: [], // all current user's ratings
    recommended: [], //items highly rated by friends
  },
  action
) {
  switch (action.type) {
    case 'SET_CURRENT_LIST':
      return {...state, currentList: action.payload}
    case 'LOGOUT_USER':
      return {...state, next: [], watching: [], seen: [], all: [], ratings: [] }
    case 'LOGIN_USER':
      const {next, watching, seen, ratings, recommended } = action.payload
      return {...state, next: next, watching: watching, seen: seen, all: [...next, ...watching, ...seen], ratings: ratings, recommended: recommended }
    case 'ADD_ITEM_TO_LIST':
      if (state[action.payload.list].filter(item => action.payload.item.id === item.id).length === 0) {
        return {...state, [action.payload.list]: [...state[action.payload.list], action.payload.item]}
      } else {
        return {...state};
      }
    case 'REMOVE_ITEM_FROM_LIST':
      return {...state, [action.payload.list]: state[action.payload.list].filter(item => item !== action.payload.item)}
    case 'RATE_ITEM':
      // update average rating returned from api on Item object in "seen" list
      const updatedItemList = state.seen.map(item => {
        if (item.id === action.payload.item.id) {
          return {...item, rating: action.payload.item.rating}
        } else {
          return item
        }
      })
      // update user's rating
      const updatedRatingList = state.ratings.filter(r => {
        return ((r.id !== action.payload.rating.id) && (r.item_id !== action.payload.rating.item_id))
      })
      return {...state, seen: updatedItemList, ratings: [...updatedRatingList, action.payload.rating]}
    case 'SORT_LIST':
      return {...state, [action.payload.listType]: action.payload.list}
    default:
      return {...state};
  }
}
