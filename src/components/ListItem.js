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
              {(props.currentList === 'seen') ?
                <div className="rating">
                  <span id='10' onClick={handleRating}>
                    {(props.item.rating === 10) ? '★' : '☆' }</span>
                  <span id='9' onClick={handleRating}>
                    {(props.item.rating >= 9) ? '★' : '☆' }</span>
                  <span id='8' onClick={handleRating}>
                    {(props.item.rating >= 8) ? '★' : '☆' }</span>
                  <span id='7' onClick={handleRating}>
                    {(props.item.rating >= 7) ? '★' : '☆' }</span>
                  <span id='6' onClick={handleRating}>
                    {(props.item.rating >= 6) ? '★' : '☆' }</span>
                  <span id='5' onClick={handleRating}>
                    {(props.item.rating >= 5) ? '★' : '☆' }</span>
                  <span id='4' onClick={handleRating}>
                    {(props.item.rating >= 4) ? '★' : '☆' }</span>
                  <span id='3' onClick={handleRating}>
                    {(props.item.rating >= 3) ? '★' : '☆' }</span>
                  <span id='2' onClick={handleRating}>
                    {(props.item.rating >= 2) ? '★' : '☆' }</span>
                  <span id='1' onClick={handleRating}>
                    {(props.item.rating >= 1) ? '★' : '☆' }</span>
                </div>
                : null }
              </div>
            </div>
          </a>
        </div>
      )
    }

    export default connect((state) => {
      return { currentList: state.lists.currentList }
    }, {showitemChoice, removeItemFromList, rateItem})(withRouter(ListItem))



    // <i className="fas fa-ellipsis-v fa-xs"></i>
    // <i className="fas fa-ellipsis-v fa-xs"></i>
    // <i className="fas fa-ellipsis-v fa-xs"></i>
    // <i className="fas fa-ellipsis-v fa-xs"></i>
    // <i className="fas fa-ellipsis-v fa-xs"></i>
    // <i className="fas fa-ellipsis-v fa-xs"></i>
    // <i className="fas fa-ellipsis-v fa-xs"></i>
    // <i className="fas fa-ellipsis-v fa-xs"></i>
    // <i className="fas fa-ellipsis-v fa-xs"></i>
    // <i className="fas fa-ellipsis-v fa-xs"></i>
    // <i className="fas fa-ellipsis-v fa-xs"></i>
    // <i className="fas fa-ellipsis-v fa-xs"></i>
    // <i className="fas fa-ellipsis-v fa-xs"></i>
    // <i className="fas fa-ellipsis-v fa-xs"></i>
    // <i className="fas fa-ellipsis-v fa-xs"></i>
    // <i className="fas fa-ellipsis-v fa-xs"></i>
    // <i className="fas fa-ellipsis-v fa-xs"></i>
    // <i className="fas fa-ellipsis-v fa-xs"></i>
    // <i className="fas fa-ellipsis-v fa-xs"></i>
    // <i className="fas fa-ellipsis-v fa-xs"></i>
    // <i className="fas fa-ellipsis-v fa-xs"></i>
    // <i className="fas fa-ellipsis-v fa-xs"></i>
    // <i className="fas fa-ellipsis-v fa-xs"></i>
    // <i className="fas fa-ellipsis-v fa-xs"></i>
