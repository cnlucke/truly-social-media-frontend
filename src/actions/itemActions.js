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

export const friendsWithItem = (item_id) => {
  return function(dispatch) {
    fetch(`http://localhost:3000/friends_with_item/${item_id}`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: localStorage.getItem('token')
      }
    })
    .then(handleErrors)
    .then(response => {
      const { friendsNext, friendsWatching, friendsSeen, item_id } = response
      console.log("friendsWithItem response:", response)
        dispatch({
          type: 'FRIENDS_WITH_ITEM',
          payload: { item_id, friendsNext, friendsWatching, friendsSeen }
        })
    })
    .catch(console.log);
  }
}

function handleErrors(response) {
    if (!response.ok) {
      console.log(response)
      throw Error(response.statusText);
    }
    return response.json();
}
