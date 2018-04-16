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

export const setFriendSearchTerm = (term) => {
  return {
      type: 'SET_FRIEND_SEARCH_TERM',
      payload: term,
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

export const hideFriendList = () => {
  return {
    type: 'HIDE_FRIEND_LIST',
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

export const currentFriendList = (friend, list) => {
  return (dispatch) => {
    fetch(`http://localhost:3000/profile/${friend.id}`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: localStorage.getItem('token')
      }
    })
    .then(res => res.json())
    .then(response => {
      dispatch({
        type: "SEE_FRIEND",
        payload: { user: response.user, next: response.next, watching: response.watching, seen: response.seen, list: list }
      })
    })
  }
}
