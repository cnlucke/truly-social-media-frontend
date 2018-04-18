export const showCommentContainer = () => {
  return {
    type: 'SHOW_COMMENT_CONTAINER'
  }
}

export const hideCommentContainer = () => {
  return {
    type: 'HIDE_COMMENT_CONTAINER'
  }
}

export const fetchComments = () => {
  return function(dispatch){
    fetch("http://localhost:3000/comments", {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: localStorage.getItem('token')
      }
    })
    .then(res=> res.json())
    .then(comments => {
      if (comments.error){
        alert(comments.error)
      } else {
        dispatch({
          type: 'GET_COMMENTS',
          payload: comments
        })
      }
    })
  }
}

export const sendComment = (item_id, content, user_id, api_id, username) => {
  const timestamp = formatDate(new Date())
  if (content.length > 0) {
    fetch("http://localhost:3000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: localStorage.getItem('token')
      },
      body: JSON.stringify({ comment: { item_id, content, timestamp, user_id, api_id, username }})
    })
    .then(res=> res.json())
    .then(response => {
      console.log(response)
      if (response.error){
        console.log(response)
      }
    })
  }
}

export const addComment = (comment) => {
  return {
    type: 'ADD_COMMENT',
    payload: comment
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
