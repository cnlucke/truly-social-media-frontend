import React from 'react'
import { connect } from 'react-redux'
import ListItem from './ListItem'
import Search from '../components/Search'
import { sortList } from '../actions/listActions'


class List extends React.Component {
  handleSort = (e) => {
    if (this.props.currentList === 'friends') {
      const listName = 'friend' + this.props.currentFriendList[0].toUpperCase() + this.props.currentFriendList.slice(1)
      if (e.target.id === 'rating') {
        const sortedList = this.props[listName].map(item => {
          const match = this.props.friendRatings.find(r => r.item_id === item.id)
          if (match) {
            return {item: item, rating: match.rating}
          } else {
            return {item: item, rating: 0}
          }
        })
        sortedList.sort((a, b) => b.rating - a.rating)
        const consolidatedList = sortedList.map(i => i.item)
        this.props.sortList(consolidatedList, e.target.id, this.props.currentFriendList, true)
      } else {
        this.props.sortList(this.props[listName], e.target.id, this.props.currentFriendList, true)
      }
    } else {
      this.props.sortList(this.props[this.props.currentList], e.target.id, this.props.currentList, false)
    }
  }

  render() {
    let items;
    if (this.props.seeFriend) {
      const listName = 'friend' + this.props.currentFriendList[0].toUpperCase() + this.props.currentFriendList.slice(1)
      items = this.props[listName].map((item) => {
        const r = this.props.ratings.find(r => item.id === r.item_id) || 0
        return <ListItem item={item} rating={r.rating} key={item.id} />
      })
    } else {
      items = this.props[this.props.currentList].map((item) => {
        const r = this.props.ratings.find(r => item.id === r.item_id) || 0
        return <ListItem item={item} rating={r.rating} key={item.id} />
      })
    }

    return (
      <div id="list-items-container">
        {(this.props.currentList === 'recommended') ?
          <h2 id="recommend-list-title">your friends really liked...</h2>
          : (<Search />) }
        <div id="sort-button-container">
          {(this.props.currentList === 'seen') ?
          <button className="sort-button" id='rating' onClick={this.handleSort}>
            rating  <i className="far fa-sort-numeric-up fa-lg" color='black'></i>
          </button>
          : null}
          <button className="sort-button" id='avg-rating' onClick={this.handleSort}>
            avg rating  <i className="far fa-sort-numeric-up fa-lg" color='black'></i>
            </button>
          <button className="sort-button" id='dateAdded' onClick={this.handleSort}>
            date added <i className="far fa-sort-numeric-up fa-lg" color='black'></i>
          </button>
          <button className="sort-button" id='title' onClick={this.handleSort}>
            title  <i className="far fa-sort-alpha-down fa-lg" color='black'></i>
            </button>
        </div>
        {items}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // current user props
    currentList: state.lists.currentList,
    ratings: state.lists.ratings,
    watching: state.lists.watching,
    seen: state.lists.seen,
    recommended: state.lists.recommended,

    // friend props
    seeFriend: state.friends.seeFriend,
    friendProfile: state.friends.friendProfile,
    currentFriendList: state.friends.currentFriendList,
    friendRatings: state.friends.friendRatings,
    friendNext: state.friends.next,
    friendWatching: state.friends.watching,
    friendSeen: state.friends.seen,
  }
}

export default connect(mapStateToProps, { sortList })(List)
