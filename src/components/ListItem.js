import React from 'react'
import { connect } from 'react-redux'
import { showitemChoice } from '../actions/itemActions'
import { removeItemFromList, rateItem } from '../actions/listActions'
import { withRouter } from 'react-router-dom'

const ListItem = (props) => {
  const handleChoice = () => {
    props.showitemChoice(props.item)
  }

  const handleRemove = () => {
    props.removeItemFromList(props.currentList, props.item, props.history)
  }

  const handleRating = (e) => {
    props.rateItem(e.target.id, props.item.id)
  }

  const findFriendRating = () => {
    const ratingExists = props.friendRatings.find(r => {
      return ((r.item_id === props.item.id) && (r.user_id === props.friendProfile.id))
    })
    if (ratingExists) {
      return ratingExists.rating
    } else {
      return 0
    }
  }

  const rating = (props.seeFriend) ? findFriendRating() : props.rating
  return (
    <div className="item" id={props.id}>
      <a className="item-link">
        <div className="list-item-content">
          {(props.currentList === 'next') ?
            (<div className="draggable">
            ..............................................................................................................................................................................
          </div>) : null}
          <div id="item-left-col">
            <img  onClick={handleChoice}
              src={(props.item.poster_url) ? props.item.poster_url : require('../default.jpeg')}
              className='item-img'
              alt="movie poster"/>
            <button className="list-item-remove" onClick={handleRemove}>remove</button>
          </div>
          <div id='item-text'>
            <span className="title"
              onClick={handleChoice}
              style={{textAlign: 'left'}}>
              <b>{props.item.title}</b><b className="small-title">{props.item.date.split(" ")[1]}</b>
            </span>
            <p onClick={handleChoice} id='list-item-overview'>{props.item.overview}</p>
            <p className="small-title"
              onClick={handleChoice}
              style={{textAlign: 'left'}}>
              <b>genres:</b> {props.item.genres}
            </p>
            <p className="small-title"
              onClick={handleChoice}
              style={{textAlign: 'left'}}>
              <b>media type:</b> {props.item.media_type}
            </p>
            <p className="small-title"
              onClick={handleChoice}
              style={{textAlign: 'left'}}>
              <b>average rating:</b> {props.item.rating}
            </p>
          {(props.currentList === 'seen') ?
            <div className="rating">
              <span id='10' onClick={ (props.seeFriend) ? null : handleRating}>
                {(parseInt(rating, 10) === 10) ? '★' : '☆' }</span>
              <span id='9' onClick={ (props.seeFriend) ? null : handleRating}>
                {(parseInt(rating, 10) >= 9) ? '★' : '☆' }</span>
              <span id='8' onClick={ (props.seeFriend) ? null : handleRating}>
                {(parseInt(rating, 10) >= 8) ? '★' : '☆' }</span>
              <span id='7' onClick={ (props.seeFriend) ? null : handleRating}>
                {(parseInt(rating, 10) >= 7) ? '★' : '☆' }</span>
              <span id='6' onClick={ (props.seeFriend) ? null : handleRating}>
                {(parseInt(rating, 10) >= 6) ? '★' : '☆' }</span>
              <span id='5' onClick={ (props.seeFriend) ? null : handleRating}>
                {(parseInt(rating, 10) >= 5) ? '★' : '☆' }</span>
              <span id='4' onClick={ (props.seeFriend) ? null : handleRating}>
                {(parseInt(rating, 10) >= 4) ? '★' : '☆' }</span>
              <span id='3' onClick={ (props.seeFriend) ? null : handleRating}>
                {(parseInt(rating, 10) >= 3) ? '★' : '☆' }</span>
              <span id='2' onClick={ (props.seeFriend) ? null : handleRating}>
                {(parseInt(rating, 10) >= 2) ? '★' : '☆' }</span>
              <span id='1' onClick={ (props.seeFriend) ? null : handleRating}>
                {(parseInt(rating, 10) >= 1) ? '★' : '☆' }</span>
            </div>
            : null }
          </div>
        </div>
      </a>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentList: state.lists.currentList,
    currentFriendList: state.friends.currentFriendList,
    friendRatings: state.friends.friendRatings,
    seeFriend: state.friends.seeFriend,
    friendProfile: state.friends.friendProfile,
  }
}


    export default connect(mapStateToProps, {showitemChoice, removeItemFromList, rateItem})(withRouter(ListItem))
