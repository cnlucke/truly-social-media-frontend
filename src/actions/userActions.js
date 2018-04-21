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
    .then(handleErrors)
    .then(response => {
      if (response.error){
        console.log(response)
      } else {
        const {user, next, watching, seen, friends, all_users, ratings, friend_ratings, recommended } = response
        if (response.token) {
          localStorage.setItem("token", response.token)
          dispatch({
            type: "LOGIN_USER",
            payload: { user, next, watching, seen, friends, all_users, ratings, friend_ratings, recommended }
          })
        }
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
    .then(handleErrors)
    .then(response => {
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
    .then(handleErrors)
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
    .then(handleErrors)
    .then(response => {
      if (!response.error) {
        const {user, next, watching, seen, friends, all_users, ratings, friend_ratings, recommended } = response
        dispatch({
          type: "LOGIN_USER",
          payload: { user, next, watching, seen, friends, all_users, ratings, friend_ratings, recommended }
        })
      }
    })
  }
}

function handleErrors(response) {
    if (!response.ok) {
      console.log(response)
      throw Error(response.statusText);
    }
    return response.json();
}
