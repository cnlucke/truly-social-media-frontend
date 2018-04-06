import React from 'react'
import { connect } from 'react-redux'
import { showMediaChoice } from '../actions/mediaActions'

const ListItem = (props) => {
  const title = props.item.title || props.item.name

  const handleChoice = () => {
    props.showMediaChoice(props.item)
  }

  return (
      <div className="list-item" onClick={handleChoice} id={props.id}>
        <a className="list-item-link">
          <div className="content">
            <img src={(props.item.poster_url) ? props.item.poster_url : require('../default.jpeg')}
              className='list-item-img' alt="movie poster"/>
            <div  className="title"
                  style={{textAlign: 'left'}}>
                  {(props.item.date) ?
                  `${props.item.title} - ${props.item.date.split(" ")[1]}`
                  : title}
            </div>
          </div>
        </a>
      </div>
  )
}

export default connect(null, {showMediaChoice})(ListItem)
