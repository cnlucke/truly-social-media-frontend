import React from 'react';
import { connect } from "react-redux";
import { fetchSearchResults, fetchGenres } from '../actions/searchActions'
import SearchResultsContainer from '../containers/SearchResultsContainer'

class Search extends React.Component {
  state = {
    searchTerm: ''
  }

  componentDidMount() {
    this.props.fetchGenres()
  }

  handleOnChange = (e) => {
    this.setState({searchTerm: e.target.value}, () => {
      this.props.fetchSearchResults(this.state.searchTerm, this.props.genres)
    })
  }

  render() {
    return(
      <div>
        <input  type="search"
                id="search"
                placeholder='search...'
                onChange={this.handleOnChange} />
        <SearchResultsContainer />
      </div>
    )
  }
}

export default connect((state) => ({
  searchTerm: state.search.searchTerm,
  genres: state.search.genres
}), { fetchSearchResults, fetchGenres })(Search)
