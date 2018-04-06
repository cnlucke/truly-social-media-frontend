export const showMediaChoice = (item) => {
  return {
    type: 'SHOW_MEDIA',
    payload: {item: item}
  }
}

export const hideMediaChoice = (item) => {
  return {
    type: 'HIDE_MEDIA'
  }
}
