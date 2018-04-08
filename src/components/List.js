import React from 'react'
import { connect } from 'react-redux'
import ListItem from './ListItem'
import Search from '../components/Search'

const List = (props) => {
  console.log("List props:", props)
  const items = props.list.map((item) => {
    return <ListItem item={item} key={item.id} />
  })
  return(
    <div id="list-items-container">
      <Search />
      {items}
    </div>
  )
}

export default connect(null, null)(List)
