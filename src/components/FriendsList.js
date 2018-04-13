import React from 'react'
import { connect } from 'react-redux'
import FriendSearch from './FriendSearch'
import { getAllUsers } from '../actions/userActions'
import { getFriends } from '../actions/friendActions'
import Friend from './Friend'

class FriendsList extends React.Component {
  componentDidMount() {
    this.props.getAllUsers()
    this.props.getFriends()
  }

  render() {
    const friends = this.props.friends.map((friend) => {
      return <Friend friend={friend} key={friend.id} />
    })

    return (
      <div id="friends-list">
        <FriendSearch />
        {friends}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    friends: state.friends.friends,
    all_users: state.friends.all_users
  }
}

export default connect(mapStateToProps, { getFriends, getAllUsers })(FriendsList)
