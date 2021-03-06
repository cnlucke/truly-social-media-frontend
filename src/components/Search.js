import React from 'react';
import { connect } from "react-redux";
import { fetchSearchResults, fetchGenres, clearResults } from '../actions/searchActions'
import SearchResultsContainer from '../containers/SearchResultsContainer'

class Search extends React.Component {
  state = {
    searchTerm: ''
  }

  componentDidMount() {
    this.props.fetchGenres()
  }

  componentWillUnmount() {
    this.props.clearResults()
  }

  handleOnChange = (e) => {
    this.setState({searchTerm: e.target.value}, () => {
      this.props.fetchSearchResults(this.state.searchTerm, this.props.genres)
    })
  }

  render() {
    return(
      <div id="search-div">
        <input  type="search"
                className="search"
                placeholder='add items...'
                onChange={this.handleOnChange} autoFocus/>
        <SearchResultsContainer />
      </div>
    )
  }
}

export default connect((state) => ({
  searchTerm: state.search.searchTerm,
  genres: state.search.genres
}), { fetchSearchResults, fetchGenres, clearResults })(Search)
