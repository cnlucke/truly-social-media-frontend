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
    .then(res=> res.json())
    .then(response => {
      if (response.error){
        alert(response.error)
      } else {
        localStorage.setItem("token", response.token)
        dispatch({
          type: "LOGIN_USER",
          payload: { user: response.user, next: response.next, watching: response.watching, seen: response.seen }
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
      localStorage.setItem("token", response.token)
      dispatch({
        type: "LOGIN_USER",
        payload: { user: response.user, next: [], watching: [], seen: [] }
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
      dispatch({
        type: "LOGIN_USER",
        payload: { user: response.user, next: response.next, watching: response.watching, seen: response.seen, friends: response.friends, all_users: response.all_users }
      })
    })
  }
}

export const getAllUsers = () => {
  return (dispatch) => {
    fetch('http://localhost:3000/users', {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: localStorage.getItem('token')
      }
    })
    .then(res => res.json())
    .then(users => {
      dispatch({
        type: "GET_USERS",
        payload: { all_users: users }
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
