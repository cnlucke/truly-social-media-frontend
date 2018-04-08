export const setCurrentList = (listType) => {
  return {
    type: 'SET_CURRENT_LIST',
    payload: listType,
  }
}

export const removeItemFromList = (list, item) => {
  return {
    type: 'REMOVE_ITEM_FROM_LIST',
    payload: { list, item }
  }
}

// { "list": {"media_id": "5678", "list_type": "watching"} }
export function addToList(list,  item, history){
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
