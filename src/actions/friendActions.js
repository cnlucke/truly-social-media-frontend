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

export const hideFriendChoice = () => {
  return {
    type: 'HIDE_FRIEND'
  }
}

export const getFriend = (friend) => {
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
      const {user, next, watching, seen, friends, all_users, ratings, friend_ratings, recommended } = response
      dispatch({
        type: "GET_FRIEND",
        payload: { user, next, watching, seen, friends, all_users, ratings, friend_ratings, recommended }
      })
    })
  }
}

export function addFriend(friend){
  return function(dispatch) {
    fetch("http://localhost:3000/friends", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: localStorage.getItem('token')
      },
      body: JSON.stringify({user: friend})
    })
    .then(handleErrors)
    .then(friend => {
      dispatch({
        type: 'ADD_FRIEND',
        payload: friend
      })
    })
    .catch(console.log)
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
    .then(handleErrors)
    .then(friend => {
      console.log("removed friend!")
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
    .then(handleErrors)
    .then(response => {
      const {user, next, watching, seen, ratings } = response
      dispatch({
        type: "SEE_FRIEND",
        payload: { user, next, watching, seen, ratings, list }
      })
    })
    .catch(console.log);
  }
}

function handleErrors(response) {
  console.log("response:", response)
  // console.log("response.json():", response.json())
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
}
