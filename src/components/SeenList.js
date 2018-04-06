import React from 'react'
import { connect } from 'react-redux'

const SeenList = (props) => {
  return (
    <div id="seen-list">
      <ul>Seen List</ul>
    </div>
  )
}

export default connect(null, null)(SeenList)
