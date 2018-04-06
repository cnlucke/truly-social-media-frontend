import React from 'react'
import { connect } from 'react-redux'

const NextList = (props) => {
  return (
    <div id="next-list">
      <ul>Next List</ul>
    </div>
  )
}

export default connect(null, null)(NextList)
