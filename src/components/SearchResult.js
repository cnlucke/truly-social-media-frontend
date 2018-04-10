import React from 'react'
import { connect } from 'react-redux'
import { showitemChoice } from '../actions/itemActions'

const ListItem = (props) => {
  const handleChoice = () => {
    props.showitemChoice(props.item)
  }

  return (
      <div className="result" onClick={handleChoice} id={props.id}>
        <a className="result-link">
          <div className="content">
            <img src={(props.item.poster_url) ? props.item.poster_url : require('../default.jpeg')}
              className='result-img' alt="movie poster"/>
            <div  className="title"
                  style={{textAlign: 'left'}}>
                  {(props.item.date) ?
                  `${props.item.title} - ${props.item.date.split(" ")[1]}`
                  : props.item.title}
            </div>
          </div>
        </a>
      </div>
  )
}

export default connect(null, {showitemChoice})(ListItem)
