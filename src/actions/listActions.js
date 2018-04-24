export const setCurrentList = (listType) => {
  return {
    type: 'SET_CURRENT_LIST',
    payload: listType,
  }
}

export const removeItemFromList = (list, item, history) => {
  return function(dispatch) {
    fetch("http://localhost:3000/remove_list_item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: localStorage.getItem('token')
      },
      body: JSON.stringify({ list: {list_type: list, item_id: item.id, items_attributes: {...item} }})
    })
    .then(handleErrors)
    .then(response => {
        dispatch({
          type: 'REMOVE_ITEM_FROM_LIST',
          payload: { list, item }
        })
      })
    .catch(console.log);
  }
}

// { "list": {"item_id": "5678", "list_type": "watching"} }
export const addToList = (list,  item, history) => {
  return function(dispatch) {
    fetch("http://localhost:3000/add_list_item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: localStorage.getItem('token')
      },
      body: JSON.stringify({ list: {list_type: list, items_attributes: item }})
    })
    .then(handleErrors)
    .then(response => {
        dispatch({
          type: 'SHOW_ITEM',
          payload: { item: response.item }
        })
        dispatch({
          type: 'ADD_ITEM_TO_LIST',
          payload: { list: response.list_type, item: response.item }
        })
      })
    .then(()=> {
      history.push('/')
    })
    .catch(console.log);
  }
}

export const rateItem = (rating, item_id) => {
  return function(dispatch) {
    fetch("http://localhost:3000/rate_item", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: localStorage.getItem('token')
      },
      body: JSON.stringify({ item: { id: item_id, rating: rating }})
    })
    .then(handleErrors)
    .then(response => {
        dispatch({
          type: 'RATE_ITEM',
          payload: { item: response.item, rating: response.rating}
        })
    })
    .catch(console.log);
  }
}

export const sortList = (list, sortType, listType, friend) => {
  return function(dispatch) {
    console.log("sortList list:", list)
    console.log("sortList sortType:", sortType)
    console.log("sortList listType:", listType)
    console.log("sortList friend:", friend)
    let newList = [...list];
    switch (sortType) {
      case 'avg-rating':
        newList.sort((a, b) => b.rating - a.rating )
      break;
      case 'title':
        newList.sort((a, b) => {
          var titleA = a.title.toUpperCase(); // ignore upper and lowercase
          var titleB = b.title.toUpperCase(); // ignore upper and lowercase
          if (titleA < titleB) {
            return -1;
          }
          if (titleA > titleB) {
            return 1;
          }
          return 0;
        })
      break;
      case 'dateAdded':
        newList.sort((a, b) => {
          a = new Date(a.created_at);
          b = new Date(b.created_at);
          return (a > b) ? -1 : (a < b) ? 1 : 0;
        })
        break;
      default:
        break;
    }
    if (listType === 'seen' && !friend) {
      fetch("http://localhost:3000/order", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify({ list: { items_attributes: newList }})
      })
      .then(handleErrors)
      .then(list => {
          dispatch({
            type: 'SORT_LIST',
            payload: { listType, list }
          })
        })
      .catch(console.log)
    } else if (friend){
      dispatch({
        type: 'SORT_FRIEND_LIST',
        payload: { listType, list: newList }
      })
    } else {
      dispatch({
        type: 'SORT_LIST',
        payload: { listType, list: newList }
      })
    }
  }
}

function handleErrors(response) {
    if (!response.ok) {
      console.log(response)
      throw Error(response.statusText);
    }
    return response.json();
}
