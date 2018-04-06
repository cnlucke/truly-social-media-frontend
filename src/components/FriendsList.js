import React from 'react'
import { connect } from 'react-redux'

const FriendsList = (props) => {
  return (
    <div id="friends-list">
      <ul>Friends List</ul>
    </div>
  )
}

export default connect(null, null)(FriendsList)
