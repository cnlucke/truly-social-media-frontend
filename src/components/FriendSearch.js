import React from 'react';
import { connect } from "react-redux";
import { clearResults } from '../actions/searchActions'
import { setFriendSearchResults, setFriendSearchTerm } from '../actions/friendActions'
import SearchResultsContainer from '../containers/SearchResultsContainer'

class FriendSearch extends React.Component {

  componentWillUnmount() {
    this.props.clearResults()
  }

  handleOnChange = (e) => {
    this.props.setFriendSearchTerm(e.target.value)
    if (e.target.value === '') {
      this.props.clearResults()
    } else {
      this.props.setFriendSearchResults(this.searchUsers())
    }
  }

  handleOnBlur = () => {
    setTimeout(this.props.clearResults, 200)
  }

  searchUsers = () => {
    const term = this.props.searchTerm.toLowerCase()
    return this.props.all_users.filter(user => {
      return (user.first_name.toLowerCase().includes(term)
            || user.last_name.toLowerCase().includes(term)
            || user.email.toLowerCase().includes(term)
            || user.city.toLowerCase().includes(term))
    })
  }

  render() {
    return(
      <div>
        <input  type="search"
                id="friend-search"
                className="search"
                placeholder='search for friends...'
                value={this.props.searchTerm}
                onBlur={this.handleOnBlur}
                onFocus={this.handleOnChange}
                onChange={this.handleOnChange} autoFocus/>
        <SearchResultsContainer />
      </div>
    )
  }
}

export default connect((state) => ({
  currentUser: state.users.currentUser,
  all_users: state.friends.all_users,
  friends: state.friends.friends,
  searchTerm: state.friends.friendSearchTerm,
}), { setFriendSearchResults, clearResults, setFriendSearchTerm })(FriendSearch)
