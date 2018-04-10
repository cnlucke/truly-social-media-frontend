export const setCurrentList = (listType) => {
  return {
    type: 'SET_CURRENT_LIST',
    payload: listType,
  }
}

export const removeItemFromList = (list, item, history) => {
  return function(dispatch){
    fetch("http://localhost:3000/remove_list_item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: localStorage.getItem('token')
      },
      body: JSON.stringify({ list: {list_type: list, item_id: item.id, items_attributes: {...item} }})
    })
    .then(res=> res.json())
    .then(response => {
      if (response.error){
        alert(response.error)
      } else {
        dispatch({
          type: 'REMOVE_ITEM_FROM_LIST',
          payload: { list, item }
        })
      }
    })
  }
}

// { "list": {"item_id": "5678", "list_type": "watching"} }
export const addToList = (list,  item, history) => {
  return function(dispatch){
    fetch("http://localhost:3000/add_list_item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: localStorage.getItem('token')
      },
      body: JSON.stringify({ list: {"list_type": list, items_attributes: item }})
    })
    .then(res=> res.json())
    .then(response => {
      if (response.error){
        alert(response.error)
      } else {
        dispatch({
          type: 'ADD_ITEM_TO_LIST',
          payload: { list: response.list_type, item: response.item }
        })
      }

    })
    .then(()=> {
      history.push('/')
    })
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
    .then(res=> res.json())
    .then(response => {
      if (response.error){
        alert(response.error)
      } else {
        dispatch({
          type: 'RATE_ITEM',
          payload: { rating: response.rating, item_id: response.id }
        })
      }
    })
  }
}

export const sortList = (list, sortType, listType) => {
  let newList = [...list];
  switch (sortType) {
    case 'rating':
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
      return list;
  }
  return {
    type: 'SORT_LIST',
    payload: { listType, list: newList }
  }
}
