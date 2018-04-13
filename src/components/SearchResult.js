import React from 'react'
import { connect } from 'react-redux'
import { showitemChoice } from '../actions/itemActions'
import { showFriendChoice } from '../actions/friendActions'

const SearchResult = (props) => {
  const handleChoice = () => {
    if (props.type === "item") {
      props.showitemChoice(props.item)
    } else {
      props.showFriendChoice(props.item)
    }
  }

  return (
      <div className="result" onClick={handleChoice} id={props.id}>
        <a className="result-link">
            {(props.type === 'friend') ?
              <div className="content">
                <i className="fas fa-user-plus fa-1x"></i>
                  <div  className="title"
                  style={{textAlign: 'left'}}>
                  { `${props.item.first_name} ${props.item.last_name} - ${props.item.city}, ${props.item.state}`}
                  </div>
              </div>
              : (<div className="content">
                <img src={(props.item.poster_url) ? props.item.poster_url : require('../default.jpeg')}
                  className='result-img' alt="movie poster"/>
                    <div className="title"
                      style={{textAlign: 'left'}}>
                      {(props.item.date) ? `${props.item.title} - ${props.item.date.split(" ")[1]}`
                      : props.item.title}
                    </div>
                </div>)
             }
        </a>
      </div>
  )
}

export default connect(null, {showitemChoice, showFriendChoice})(SearchResult)
