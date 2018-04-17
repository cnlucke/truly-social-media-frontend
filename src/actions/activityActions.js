export const getActivityFeed = () => {
  return (dispatch) => {
    fetch('http://localhost:3000/feed', {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: localStorage.getItem('token')
      }
    })
    .then(res => res.json())
    .then(response => {
      console.log(response)
      const formattedResponse = response.map(activity => {
        activity.created_at = formatDate(new Date(activity.created_at))
        return activity
      })
      console.log("getActivityFeed response:", formattedResponse)
      if (!response.error) {
        dispatch({
          type: "GET_ACTIVITY",
          payload: formattedResponse
        })
      }
    })
  }
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
