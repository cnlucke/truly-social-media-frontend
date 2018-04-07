import React from 'react'
import { connect } from 'react-redux'
import ListItem from './ListItem'

const List = (props) => {
  const items = props.list.map((item) => {
    return <ListItem item={item} key={item.id} />
  })
  return(
    <div id="search-items-container">
      List:
      {items}
    </div>
  )
}

export default connect(null, null)(List)
