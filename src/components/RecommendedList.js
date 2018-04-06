import React from 'react'
import { connect } from 'react-redux'

const RecommendedList = (props) => {
  return (
    <div id="recommended-list">
      <ul>Recommended List</ul>
    </div>
  )
}

export default connect(null, null)(RecommendedList)
