import React from 'react'
import { connect } from 'react-redux'
import ListItem from './ListItem'
import Search from '../components/Search'
import { sortList } from '../actions/listActions'


class List extends React.Component {

  handleSort = (e) => {
    if (this.props.currentList === 'friends') {
      if (e.target.id === 'rating') {
        const sortedList = this.props.list.map(item => {
          const match = this.props.friendRatings.find(r => r.item_id === item.id)
          if (match) {
            return {item: item, rating: match.rating}
          } else {
            return {item: item, rating: 0}
          }
        })
        sortedList.sort((a, b) => b.rating - a.rating)


        this.props.sortList(sortedList, e.target.id, this.props.currentFriendList, true)
      } else {
        this.props.sortList(this.props.list, e.target.id, this.props.currentFriendList, true)
      }
    } else {
      this.props.sortList(this.props.list, e.target.id, this.props.currentList, false)
    }
  }

  render() {
    if (this.props.currentList === 'seen') {
      console.log("List seen:", this.props.list)
    }
    console.log()
    const items = this.props.list.map((item) => {
      const r = this.props.ratings.find(r => item.id === r.item_id) || 0
      return <ListItem item={item} rating={r.rating} key={item.id} />
    })
    if (this.props.seeFriend) {
      return(
        <div id="list-items-container">
          <h2 id="friend-list-title">{`${this.props.friendProfile.first_name.toLowerCase()}'s ${this.props.currentFriendList} list`}</h2>
          <div id="sort-button-container">
            {(this.props.currentFriendList === 'seen') ?
            <button className="sort-button" id='rating' onClick={this.handleSort}>rating</button>
            : null}
            <button className="sort-button" id='avg-rating' onClick={this.handleSort}>avg rating</button>
            <button className="sort-button" id='dateAdded' onClick={this.handleSort}>date added</button>
            <button className="sort-button" id='title' onClick={this.handleSort}>title</button>
          </div>
          {items}
        </div>
      )
    } else {
      return (
        <div id="list-items-container">
          {(this.props.currentList === 'recommended') ?
            <h2 id="recommend-list-title">your friends really liked...</h2>
            : (<Search />) }
          <div id="sort-button-container">
            {(this.props.currentList === 'seen') ?
            <button className="sort-button" id='rating' onClick={this.handleSort}>rating</button>
            : null}
            <button className="sort-button" id='avg-rating' onClick={this.handleSort}>avg rating</button>
            <button className="sort-button" id='dateAdded' onClick={this.handleSort}>date added</button>
            <button className="sort-button" id='title' onClick={this.handleSort}>title</button>
          </div>
          {items}
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentList: state.lists.currentList,
    seeFriend: state.friends.seeFriend,
    friendProfile: state.friends.friendProfile,
    currentFriendList: state.friends.currentFriendList,
    friendRatings: state.friends.friendRatings,
    ratings: state.lists.ratings,
  }
}

export default connect(mapStateToProps, { sortList })(List)
