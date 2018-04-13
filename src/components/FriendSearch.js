import React from 'react';
import { connect } from "react-redux";
import { clearResults } from '../actions/searchActions'
import { setFriendSearchResults } from '../actions/friendActions'
import SearchResultsContainer from '../containers/SearchResultsContainer'

class FriendSearch extends React.Component {
  state = {
    searchTerm: '',
    searchResults: [],
  }

  componentWillUnmount() {
    this.props.clearResults()
  }

  handleOnChange = (e) => {
    this.setState({searchTerm: e.target.value}, () => {
      if (this.state.searchTerm === '') {
        this.props.clearResults()
      } else {
        this.searchUsers()
      }
    })
  }

  searchUsers = () => {
    const term = this.state.searchTerm

    const filteredUsers = this.props.all_users.filter(user => {
      return (user.first_name.toLowerCase().includes(term)
            || user.last_name.toLowerCase().includes(term)
            || user.email.toLowerCase().includes(term)
            || user.city.toLowerCase().includes(term))
    })
    this.setState({ searchResults: filteredUsers }, () => {
      this.props.setFriendSearchResults(this.state.searchResults)
    })
  }

  render() {
    return(
      <div>
        <input  type="search"
                id="friend-search"
                className="search"
                placeholder='search for friends...'
                value={this.state.searchTerm}
                onChange={this.handleOnChange} />
        <SearchResultsContainer />
      </div>
    )
  }
}

export default connect((state) => ({
  all_users: state.friends.all_users,
  friends: state.friends.friends,
}), { setFriendSearchResults, clearResults })(FriendSearch)
