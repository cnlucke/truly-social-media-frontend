import React from 'react'
import { connect } from 'react-redux'

const MediaModal = (props) => {
  const url = (props.mediaChoice.poster_url) ? props.mediaChoice.poster_url : require('../default.jpeg')
  return (
    <div id="movie-modal" className="modal">
      <div className="modal-content" style ={ { backgroundImage: "url("+url+")" } }></div>
      <div className='media-content' >
        <h5>{props.mediaChoice.title}</h5>
        <p>{props.mediaChoice.date}</p>
      </div>
    </div>
  )
}

export default connect(state => ({ mediaChoice: state.media.mediaChoice }))(MediaModal)


 //       <img src={url} className="movie-poster" alt="movie poster"/>
