export default function listsReducer(
  state = {
    currentList: "",
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
    console.log("setting current list to:", action.payload)
      return {...state, currentList: action.payload}
    case 'ADD_ITEM_TO_LIST':
      if (!state[action.payload.list].includes(action.payload.item)) {
        return {...state, [action.payload.list]: [...state[action.payload.list], action.payload.item]}
      } else {
        return {...state};
      }
    default:
      return {...state};
  }
}
