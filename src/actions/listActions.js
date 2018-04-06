export const setCurrentList = (listType) => {
  return {
    type: 'SET_CURRENT_LIST',
    payload: listType,
  }
}

export const addToList = (list, item) => {
  return {
    type: 'ADD_ITEM_TO_LIST',
    payload: { list, item }
  }
}
