export const fetchUser = () => {
  return (dispatch) => {
    if (localStorage.getItem('jwt')) {
      let options = {
        method: "GET",
        headers: {
          "Content-Type":"application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      }
      fetch("http://localhost:3000/profile", options)
      .then((res) => res.json())
      .then((user) => {
        let payload = user

        dispatch({
          type: 'LOAD_RESOURCES',
          payload
        })
      })
    } else {
      console.log("You are not logged in")
    }
  }
}

export const loginUser = (loginParams) => {
  return (dispatch) => {
    let options = {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(loginParams)
    }
    fetch("http://localhost:3000/login", options)
    .then((res) => res.json())
    .then((json) => {

      localStorage.setItem("jwt", json.token)
      let payload = json.user

      dispatch({
        type: 'LOGIN_USER',
        payload
      })
    })
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch({type: 'LOGOUT_USER'})
    localStorage.removeItem('jwt')
  }
}
