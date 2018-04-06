import React from 'react'
import { connect } from 'react-redux'

const Watching = (props) => {
  return (
    <div id="watching-list">
      <ul>Watching List</ul>
    </div>
  )
}

export default connect(null, null)(Watching)
