export function logIn(email,  password, history){
  return function(dispatch){
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
    .then(res=>res.json())
    .then(response => {
      console.log("response from getUser:", response)
      if (response.error){
        alert(response.error)
      } else {
        console.log("logIn userAction executed!")
        console.log("getUser userAction executed!")
        const {user, next, watching, seen, friends, all_users, ratings, friend_ratings, recommended } = response
        console.log("destructured response:", { user, next, watching, seen, friends, all_users, ratings, friend_ratings, recommended })
        localStorage.setItem("token", response.token)
        dispatch({
          type: "LOGIN_USER",
          payload: { user, next, watching, seen, friends, all_users, ratings, friend_ratings, recommended }
        })
      }
    })
    .then(()=> {
      history.push('/')
    })
  }
}

export function signUp(user, history){
  return function(dispatch){

    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({user})
    })
    .then(res=> res.json())
    .then(response => {
      console.log("signUp userAction executed!")
      localStorage.setItem("token", response.token)
      dispatch({
        type: "LOGIN_USER",
        payload: { user: response.user, next: [], watching: [], seen: [], ratings: [], friend_ratings: [], recommended: [] }
      })
    })
    .then(()=> {
      history.push('/')
    })
  }
}

export function updateProfile(user, history){
  return function(dispatch){
    fetch("http://localhost:3000/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: localStorage.getItem('token')
      },
      body: JSON.stringify({user})
    })
    .then(res=> res.json())
    .then(response => {
      if (!response.error) {
        dispatch({
          type: "UPDATE_USER",
          payload: response,
        })
      }
    })
    .then(()=> {
      history.push('/')
    })
  }
}

export const logoutUser = () => {
  localStorage.clear();
  return {
      type: 'LOGOUT_USER'
  }
}

export const getUser = () => {
  return (dispatch) => {
    fetch('http://localhost:3000/profile', {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: localStorage.getItem('token')
      }
    })
    .then(res => res.json())
    .then(response => {
      console.log("getUser userAction executed!")
      console.log("response from getUser:", response)
      const {user, next, watching, seen, friends, all_users, ratings, friend_ratings, recommended } = response
      console.log("destructured response:", { user, next, watching, seen, friends, all_users, ratings, friend_ratings, recommended })
      dispatch({
        type: "LOGIN_USER",
        payload: { user, next, watching, seen, friends, all_users, ratings, friend_ratings, recommended }
      })
    })
  }
}

export const setUserProfileChoice = (user) => {
  return {
      type: 'SET_PROFILE',
      payload: user,
  }
}
