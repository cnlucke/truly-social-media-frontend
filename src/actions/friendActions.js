export const getFriends = () => {
  return (dispatch) => {
    fetch('http://localhost:3000/friends', {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: localStorage.getItem('token')
      }
    })
    .then(res => res.json())
    .then(friends => {
      dispatch({
        type: "GET_FRIENDS",
        payload: friends
      })
    })
  }
}

export const setFriendSearchResults = (results) => {
  return {
      type: 'SET_RESULTS',
      payload: results,
  }
}

export const clearResults = (results) => {
  return {
      type: 'CLEAR_FRIEND_RESULTS',
  }
}

export const showFriendChoice = (friend) => {
  return {
    type: 'SHOW_FRIEND',
    payload: friend
  }
}

export const hideFriendChoice = (item) => {
  return {
    type: 'HIDE_FRIEND'
  }
}

export const addFriend = (friend) => {
  return {
    type: 'ADD_FRIEND',
    payload: friend
  }
}

export const removeFriend = (friend) => {
  return {
    type: 'REMOVE_FRIEND',
    payload: friend
  }
}
