import React from 'react'
import { connect } from 'react-redux'
import { hideitemChoice } from '../actions/itemActions'
import { addToList } from '../actions/listActions'
import { withRouter } from 'react-router-dom'

const ItemModal = (props) => {
  const url = (props.itemChoice.poster_url) ? props.itemChoice.poster_url : require('../default.jpeg')

  const handleClick = (list) => {
    props.addToList(list, props.itemChoice, props.history)
  }

  if (props.showItem) {
    return (
      <div>
      <div id="movie-modal" className="modal">
        <button id="close" onClick={props.hideitemChoice}>x</button>
        <div className='item-content' >
          <div id="movie-poster">
            <img src={url} alt="movie poster"/>
          </div>
          <p>{props.itemChoice.overview}</p>
          <p><b>genres:</b> {props.itemChoice.genres}</p>
          <p><b>release date:</b> {props.itemChoice.date}</p>
        </div>
        <div id="button-container">
          <button className="add-buttons" id="add-nextlist" onClick={() => handleClick('next')}>
            <i className="fas fa-plus fa-sm"></i><br/>
             add to next
          </button>
          <button className="add-buttons" id="add-watchinglist" onClick={() => handleClick('watching')}>
            <i className="fas fa-plus fa-sm"></i><br/>
             add to watching
          </button>
          <button className="add-buttons" id="add-seenlist" onClick={() => handleClick('seen')}>
            <i className="fas fa-plus fa-sm"></i><br/>
             add to seen
          </button>
        </div>
      </div>
      <div id="movie-modal" className="modal">
        <button id="close" onClick={props.hideitemChoice}>x</button>
        <div className='item-content' >
          <p>{props.itemChoice.overview}</p>
          <p><b>genres:</b> {props.itemChoice.genres}</p>
          <p><b>release date:</b> {props.itemChoice.date}</p>
        </div>
      </div>
    </div>
    )
  }
}

export default connect(state => ({
  itemChoice: state.item.itemChoice,
  showItem: state.item.showItem,
  list: state.lists.currentList
}), { hideitemChoice, addToList })(withRouter(ItemModal))


 //       <img src={url} className="movie-poster" alt="movie poster"/>
 // <div className="modal-content" style ={ { backgroundImage: "url("+url+")" } }></div>
