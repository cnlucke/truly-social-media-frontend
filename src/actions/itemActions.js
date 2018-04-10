export const showitemChoice = (item) => {
  return {
    type: 'SHOW_ITEM',
    payload: {item: item}
  }
}

export const hideitemChoice = (item) => {
  return {
    type: 'HIDE_ITEM'
  }
}
