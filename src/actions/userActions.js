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
          payload: { user: response.user, lists: response.lists }
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
        payload: response
      })
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

export function getUser(jwt, history){
  return function(dispatch){
    fetch('http://localhost:3000/profile', {
      headers: {
        "Authorization": jwt
      }
    })
    .then(res => res.json())
    .then(response => {
      dispatch({
        type: "LOGIN_USER",
        payload: response
      })
    })
    .then(()=> {
      history.push("/")
    })
  }
}
