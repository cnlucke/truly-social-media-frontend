import React from 'react'
import {connect} from 'react-redux'
import SearchResult from '../components/SearchResult'

const SearchResultsContainer = (props) => {
  let type, results;
  if (props.searchResults.length > 0) {
    type = 'item'
    results = props.searchResults.map((item) => {
      return <SearchResult item={item} key={item.id} type={type}/>
      })
  } else {
    type = 'friend'
    results = props.friendSearchResults.map((item) => {
      return <SearchResult item={item} key={item.id} type={type} />
    })
  }

  return(
    <div id="search-results-container">
      {results.slice(0, 5)}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    searchResults: state.search.searchResults,
    friendSearchResults: state.friends.friendSearchResults
  }
}

export default connect(mapStateToProps, null)(SearchResultsContainer)
