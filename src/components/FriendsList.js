import React from 'react'
import { connect } from 'react-redux'
import FriendSearch from './FriendSearch'
import { getAllUsers } from '../actions/userActions'
import { getFriends } from '../actions/friendActions'
import List from './List'
import Friend from './Friend'

class FriendsList extends React.Component {
  state = {
    filteredFriends: [],
  }

  componentDidMount() {
    this.props.getAllUsers()
    this.props.getFriends()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({filteredFriends: this.searchFriends(nextProps.friends)})
  }

  searchFriends = () => {
    const term = this.props.searchTerm.toLowerCase()
    return this.props.friends.filter(user => {
      return (user.first_name.toLowerCase().includes(term)
            || user.last_name.toLowerCase().includes(term)
            || user.email.toLowerCase().includes(term)
            || user.city.toLowerCase().includes(term))
    })
  }

  render() {
    if (this.props.seeFriend) {
      return <List list={this.props[this.props.seeFriendList]} />
    } else {
      console.log("this.searchFriends() in render:", this.searchFriends())
      const friends = this.searchFriends().map((friend) => {
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
}

const mapStateToProps = (state) => {
  return {
    friends: state.friends.friends,
    all_users: state.friends.all_users,
    seeFriend: state.friends.seeFriend,
    friendProfile: state.friends.friendProfile,
    seeFriendList: state.friends.seeFriendList,
    next: state.friends.next,
    watching: state.friends.watching,
    seen: state.friends.seen,
    searchTerm: state.friends.friendSearchTerm,
    friendSearchResults: state.friends.friendSearchResults,
  }
}

export default connect(mapStateToProps, { getFriends, getAllUsers })(FriendsList)
