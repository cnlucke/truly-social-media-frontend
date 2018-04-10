import React from 'react'
import { connect } from 'react-redux'
import { hideMediaChoice } from '../actions/mediaActions'
import { addToList } from '../actions/listActions'
import { withRouter } from 'react-router-dom'

const MediaModal = (props) => {
  const url = (props.mediaChoice.poster_url) ? props.mediaChoice.poster_url : require('../default.jpeg')

  const handleClick = (list) => {
    props.addToList(list, props.mediaChoice, props.history)
  }

  if (props.showMedia) {
    return (
      <div id="movie-modal" className="modal">
        <button id="close" onClick={props.hideMediaChoice}>x</button>
        <div className='media-content' >
          <div id="movie-poster">
            <img src={url} alt="movie poster"/>
          </div>
          <p>{props.mediaChoice.overview}</p>
          <p><b>genres:</b> {props.mediaChoice.genres}</p>
          <p><b>release date:</b> {props.mediaChoice.date}</p>
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
    )
  }
}

export default connect(state => ({
  mediaChoice: state.media.mediaChoice,
  showMedia: state.media.showMedia,
  list: state.lists.currentList
}), { hideMediaChoice, addToList })(withRouter(MediaModal))


 //       <img src={url} className="movie-poster" alt="movie poster"/>
 // <div className="modal-content" style ={ { backgroundImage: "url("+url+")" } }></div>
