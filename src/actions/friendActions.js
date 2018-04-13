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

export function addFriend(friend){
  return function(dispatch){

    fetch("http://localhost:3000/friends", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: localStorage.getItem('token')
      },
      body: JSON.stringify({user: friend})
    })
    .then(res=> res.json())
    .then(friend => {
      if (friend.error) {
        alert(friend.error)
      } else {
        dispatch({
          type: 'ADD_FRIEND',
          payload: friend
        })
      }
    })
  }
}


export const removeFriendOld = (friend) => {
  return {
    type: 'REMOVE_FRIEND',
    payload: friend
  }
}

export function removeFriend(friend){
  return function(dispatch){

    fetch("http://localhost:3000/remove_friend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: localStorage.getItem('token')
      },
      body: JSON.stringify({user: friend})
    })
    .then(res=> res.json())
    .then(friend => {
      dispatch({
        type: 'REMOVE_FRIEND',
        payload: friend
      })
    })
  }
}
