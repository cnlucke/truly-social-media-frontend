export const fetchActivityFeed = () => {
  return function(dispatch) {
    fetch('http://localhost:3000/feed', {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: localStorage.getItem('token')
      }
    })
    .then(handleErrors)
    .then(activity => {
      console.log("got new activities!")
      dispatch({
        type: 'SET_ACTIVITY',
        payload: formatActivity(activity)
      })
    })
    .catch(console.log);
  }
}

export const setActivityFeed = (activity) => {
  return {
    type: "SET_ACTIVITY",
    payload: formatActivity(activity)
  }
}

function formatActivity(activity) {
  return (activity.map(act => {
    act.created_at = formatDate(new Date(act.created_at))
    return act
  }))
}

function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime + ' ' + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
}

function handleErrors(response) {
    if (!response.ok) {
      console.log(response)
      throw Error(response.statusText);
    }
    return response.json();
}
