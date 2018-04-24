import React from 'react'
import { connect } from 'react-redux'
import { showitemChoice, friendsWithItem } from '../actions/itemActions'
import { removeItemFromList, rateItem } from '../actions/listActions'
import { withRouter } from 'react-router-dom'

class ListItem extends React.Component {
  componentDidMount() {
    this.props.friendsWithItem(this.props.item.id)
  }

  handleChoice = () => {
    this.props.showitemChoice(this.props.item)
  }

  handleRemove = () => {
    this.props.removeItemFromList(this.props.currentList, this.props.item, this.props.history)
  }

  handleRating = (e) => {
    this.props.rateItem(e.target.id, this.props.item.id)
  }

  // This is for displaying a specific friend's rating when viewing their list
  findFriendRating = () => {
    const ratingExists = this.props.friendRatings.find(r => {
      return ((r.item_id === this.props.item.id) && (r.user_id === this.props.friendProfile.id))
    })
    if (ratingExists) {
      return ratingExists.rating
    } else {
      return 0
    }
  }

  // For showing number of friends who rated item on Recommended tab
  ratingCount = () => {
    let count = 0
    for(let i = 0; i < this.props.friendRatings.length; i++) {
      if (this.props.friendRatings[i].item_id === this.props.item.id) {
        count ++;
      }
    }
    return count;
  }

  // For showing which friends who rated item on Recommended tab
  whoRecommends = () => {
    //find friend ratings matching current Item
    const matchingHighRatings = this.props.friendRatings.filter(r => {
      return (r.item_id === this.props.item.id) && (r.rating >= 9)
    })
    //convert to array of user ids
    const matchingFriendsIds = matchingHighRatings.map(r => ({friendId: r.user_id, rating: r.rating}))
    //convert to array of friend objects
    const matchingFriends = matchingFriendsIds.map(i => {
      const friend = this.props.friends.find(f => f.id === i.friendId)
      return ({ friend, rating: i.rating })
    })

    return matchingFriends.map(f => f.friend.first_name + ' ' + f.friend.last_name + ` (${f.rating})`)
  }

  render () {
    let friendsNext = null
    let friendsWatching = null
    let friendsSeen = null

    if (this.props.friendNamesWithItem.length > 0) {
      const matching = this.props.friendNamesWithItem.find(i => i.item_id === this.props.item.id)
      if (matching) {
        if (matching.friendsNext.length > 0) {
          friendsNext = matching.friendsNext
        }
        if (matching.friendsWatching.length > 0) {
          friendsWatching = matching.friendsWatching
        }
        if (matching.friendsSeen.length > 0) {
          friendsSeen = matching.friendsSeen
        }
      }
    }

    const rating = (this.props.seeFriend) ? this.findFriendRating() : this.props.rating
    return (
      <div className="item" id={this.props.id}>
        <a className="item-link">
          <div className="list-item-content">
            {(this.props.currentList === 'next') ?
              (<div className="draggable">
              ..............................................................................................................................................................................
            </div>) : null}
            <div id="item-left-col">
              <img  onClick={this.handleChoice}
                src={(this.props.item.poster_url) ? this.props.item.poster_url : require('../default.jpeg')}
                className='item-img'
                alt="movie poster"/>
              {(this.props.currentList === 'recommended') ? null :<button className="list-item-remove" onClick={this.handleRemove}>remove</button>
              }
            </div>
            <div id='item-text'>
              <span className="title"
                onClick={this.handleChoice}
                style={{textAlign: 'left'}}>
                <b>{this.props.item.title}</b><b className="small-title">{this.props.item.date.split(" ")[1]}</b>
              </span>
              <p onClick={this.handleChoice} id='list-item-overview'>{this.props.item.overview}</p>
              <p className="small-title"
                onClick={this.handleChoice}
                style={{textAlign: 'left'}}>
                <b>genres:</b> {this.props.item.genres}
              </p>
              <p className="small-title"
                onClick={this.handleChoice}
                style={{textAlign: 'left'}}>
                <b>media type:</b> {this.props.item.media_type}
              </p>
              <p className="small-title"
                onClick={this.handleChoice}
                style={{textAlign: 'left'}}>
                <b>overall average rating:</b> {this.props.item.rating}
              </p>
              {(this.props.currentList === 'recommended') ?
              (<div>
                <p className="small-title"
                  onClick={this.handleChoice}
                  style={{textAlign: 'left'}}>
                  <b>number of friend ratings:</b> {this.ratingCount()}
                </p>
                {(this.whoRecommends().length > 0) ?
                (<p className="small-title"
                  onClick={this.handleChoice}
                  style={{textAlign: 'left'}}>
                  <b>highly rated by:</b> {this.whoRecommends().join(', ')}
                </p>) : null}
              </div>)
              : null}
              {(friendsNext) ?
                  (<p className="small-title"
                    onClick={this.handleChoice}
                    style={{textAlign: 'left'}}>
                    <b>friends who want to watch this:</b> {friendsNext.join(', ')}</p>)
                  : null}
              {(friendsWatching) ?
                (<p className="small-title"
                  onClick={this.handleChoice}
                  style={{textAlign: 'left'}}>
                  <b>friends watching this:</b> {friendsWatching.join(', ')}</p>)
                  : null}
              {(friendsSeen) ?
                  (<p className="small-title"
                    onClick={this.handleChoice}
                    style={{textAlign: 'left'}}>
                    <b>friends who saw this:</b> {friendsSeen.join(', ')}</p>)
                  : null}
            {(this.props.currentList === 'seen') ?
              <div className="rating">
                <span id='10' onClick={ (this.props.seeFriend) ? null : this.handleRating}>
                  {(parseInt(rating, 10) === 10) ? '★' : '☆' }</span>
                <span id='9' onClick={ (this.props.seeFriend) ? null : this.handleRating}>
                  {(parseInt(rating, 10) >= 9) ? '★' : '☆' }</span>
                <span id='8' onClick={ (this.props.seeFriend) ? null : this.handleRating}>
                  {(parseInt(rating, 10) >= 8) ? '★' : '☆' }</span>
                <span id='7' onClick={ (this.props.seeFriend) ? null : this.handleRating}>
                  {(parseInt(rating, 10) >= 7) ? '★' : '☆' }</span>
                <span id='6' onClick={ (this.props.seeFriend) ? null : this.handleRating}>
                  {(parseInt(rating, 10) >= 6) ? '★' : '☆' }</span>
                <span id='5' onClick={ (this.props.seeFriend) ? null : this.handleRating}>
                  {(parseInt(rating, 10) >= 5) ? '★' : '☆' }</span>
                <span id='4' onClick={ (this.props.seeFriend) ? null : this.handleRating}>
                  {(parseInt(rating, 10) >= 4) ? '★' : '☆' }</span>
                <span id='3' onClick={ (this.props.seeFriend) ? null : this.handleRating}>
                  {(parseInt(rating, 10) >= 3) ? '★' : '☆' }</span>
                <span id='2' onClick={ (this.props.seeFriend) ? null : this.handleRating}>
                  {(parseInt(rating, 10) >= 2) ? '★' : '☆' }</span>
                <span id='1' onClick={ (this.props.seeFriend) ? null : this.handleRating}>
                  {(parseInt(rating, 10) >= 1) ? '★' : '☆' }</span>
              </div>
              : null }
            </div>
          </div>
        </a>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentList: state.lists.currentList,
    currentFriendList: state.friends.currentFriendList,
    friendRatings: state.friends.friendRatings,
    seeFriend: state.friends.seeFriend,
    friendProfile: state.friends.friendProfile,
    friends: state.friends.friends,
    friendNamesWithItem: state.items.friendsWithItem,
  }
}


    export default connect(mapStateToProps, {showitemChoice, removeItemFromList, rateItem, friendsWithItem})(withRouter(ListItem))
