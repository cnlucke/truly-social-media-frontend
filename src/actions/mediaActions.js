export const showMediaChoice = (item) => {
  return {
    type: 'SHOW_MEDIA',
    payload: {item: item, showMedia: true}
  }
}
