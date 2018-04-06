import React from 'react'
import {connect} from 'react-redux'
import SearchResult from '../components/SearchResult'

const SearchResultsContainer = (props) => {
  const results = props.searchResults.map((item, index) => {
    return <SearchResult item={item} key={item.id} id={(index === 0) ? 'first' : (index === props.searchResults.length - 1) ? 'last' : undefined }/>
  })
  return(
    <div id="search-results-container">
      {results}
    </div>
  )
}

export default connect((state) => ({searchResults: state.search.searchResults}), null)(SearchResultsContainer)
