import React from 'react'
import { connect } from 'react-redux'
import ListItem from './ListItem'
import Search from '../components/Search'
import { sortList } from '../actions/listActions'


const List = (props) => {
  const items = props.list.map((item) => {
    return <ListItem item={item} key={item.id} />
  })

  const handleSort = (e) => {
    props.sortList(props.list, e.target.id, props.currentList)
  }

  if (props.seeFriend) {
    return(
      <div id="list-items-container">
        <h2 id="friend-list-title">{`${props.friendProfile.first_name.toLowerCase()}'s ${props.seeFriendList} list`}</h2>
        {items}
      </div>
    )
  } else {
    return (
      <div id="list-items-container">
        <Search />
        <div id="sort-button-container">
          {(props.currentList === 'seen') ?
          <button className="sort-button" id='rating' onClick={handleSort}>rating</button>
          : null}
          <button className="sort-button" id='dateAdded' onClick={handleSort}>date added</button>
          <button className="sort-button" id='title' onClick={handleSort}>title</button>
        </div>
        {items}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentList: state.lists.currentList,
    seeFriend: state.friends.seeFriend,
    friendProfile: state.friends.friendProfile,
    seeFriendList: state.friends.seeFriendList,
  }
}

export default connect(mapStateToProps, { sortList })(List)
