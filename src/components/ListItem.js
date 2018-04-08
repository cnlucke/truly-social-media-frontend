import React from 'react'
import { connect } from 'react-redux'
import { showMediaChoice } from '../actions/mediaActions'
import { removeItemFromList } from '../actions/listActions'

const ListItem = (props) => {
  console.log("ListItem props:", props.item.title, props.item.date)
  const handleChoice = () => {
    props.showMediaChoice(props.item)
  }

  const handleRemove = () => {
    props.removeItemFromList(props.currentList, props.item)
  }

  return (
      <div className="item" id={props.id}>
        <a className="item-link">
          <div className="item-content">
            <img  onClick={handleChoice}
                  src={(props.item.poster_url) ? props.item.poster_url : require('../default.jpeg')}
                  className='item-img'
                  alt="movie poster"/>
            <div id='item-text'>
              <div className="title"
                    onClick={handleChoice}
                    style={{textAlign: 'left'}}>
                    {(props.item.date) ?
                    <b>{`${props.item.title} - ${props.item.date.split(" ")[1]}`}</b>
                    : <b>props.item.title</b>}
              </div>
              <div>
                <p onClick={handleChoice} id='overview'>{props.item.overview}</p>
              </div>
              <div>
                <button className="list-item-remove" onClick={handleRemove}>remove</button>
              </div>
            </div>
          </div>
        </a>
      </div>
  )
}

export default connect((state) => {
  return { currentList: state.lists.currentList }
}, {showMediaChoice, removeItemFromList})(ListItem)
