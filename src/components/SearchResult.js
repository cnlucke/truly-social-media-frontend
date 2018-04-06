import React from 'react'
import { connect } from 'react-redux'
import { showMediaChoice } from '../actions/mediaActions'

const SearchResult = (props) => {
  const date = props.release_date || props.first_air_date
  const title = props.title || props.name

  const handleChoice = () => {
    props.showMediaChoice(props)
  }

  return (
      <div className="result" onClick={handleChoice} id={props.id}>
        <a className="result-link">
          <div className="content">
            <img src={(props.poster_url) ? props.poster_url : require('../default.jpeg')}
              className='result-img' alt="movie poster"/>
            <div  className="title"
                  style={{textAlign: 'left'}}>
                  {(props.date) ?
                  `${props.title} - ${props.date.split(" ")[1]}`
                  : title}
            </div>
          </div>
        </a>
      </div>
  )
}

export default connect(null, {showMediaChoice})(SearchResult)
