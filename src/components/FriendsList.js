import React from 'react'
import { connect } from 'react-redux'
import FriendSearch from './FriendSearch'
import { getFriends } from '../actions/friendActions'
import List from './List'
import Friend from './Friend'
import ActivityFeedContainer from '../containers/ActivityFeedContainer'
import FriendModal from '../components/FriendModal'

class FriendsList extends React.Component {
  state = {
    filteredFriends: [],
  }

  componentDidMount() {
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
      return <List list={this.props[this.props.currentFriendList]} />
    } else {
      const friends = this.searchFriends().map((friend) => {
        return <Friend friend={friend} key={friend.id} />
      })

      return (
        <div id='friend-container'>
          <div id="friends-list">
            <FriendSearch />
            {(this.props.showFriend) ? (<FriendModal />) : friends}
          </div>
          <ActivityFeedContainer />
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
    showFriend: state.friends.showFriend,
    currentFriendList: state.friends.currentFriendList,
    next: state.friends.next,
    watching: state.friends.watching,
    seen: state.friends.seen,
    searchTerm: state.friends.friendSearchTerm,
  }
}

export default connect(mapStateToProps, { getFriends })(FriendsList)
