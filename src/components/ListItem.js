import React from 'react'
import { connect } from 'react-redux'
import { showMediaChoice } from '../actions/mediaActions'

const ListItem = (props) => {

  const handleChoice = () => {
    props.showMediaChoice(props.item)
  }

  return (
      <div className="item" onClick={handleChoice} id={props.id}>
        <a className="item-link">
          <div className="item-content">
            <img src={(props.item.poster_url) ? props.item.poster_url : require('../default.jpeg')}
              className='item-img' alt="movie poster"/>
            <div id='item-text'>
              <div className="title"
                    style={{textAlign: 'left'}}>
                    {(props.item.date) ?
                    <b>{`${props.item.title} - ${props.item.date.split(" ")[1]}`}</b>
                    : <b>props.item.title</b>}
              </div>
              <div>
                <p id='overview'>{props.item.overview}</p>
              </div>
            </div>
          </div>
        </a>
      </div>
  )
}

export default connect(null, {showMediaChoice})(ListItem)
