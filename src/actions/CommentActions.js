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
    .then(handleErrors)
    .then(comments => {
      dispatch({
        type: 'GET_COMMENTS',
        payload: comments
      })
    })
    .catch(console.log);
  }
}

export const sendComment = (item_id, content, user_id, api_id, username) => {
  return function(dispatch){
    if (content.length > 0) {
      fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify({ comment: { item_id, content, user_id, api_id, username }})
      })
      .then(handleErrors)
      .then(console.log)
      .catch(console.log);
    }
  }
}

export const addComment = (comment) => {
  return {
    type: 'ADD_COMMENT',
    payload: comment
  }
}

function handleErrors(response) {
    if (!response.ok) {
      console.log(response)
      throw Error(response.statusText);
    }
    return response.json();
}
