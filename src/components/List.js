import React from 'react'
import { connect } from 'react-redux'
import ListItem from './ListItem'
import Search from '../components/Search'
import { sortList } from '../actions/listActions'


class List extends React.Component {

  handleSort = (e) => {
    console.log("SORTING!")
    if ((this.props.currentList === 'friends') && (e.target.id === 'rating')) {
      //get current friend's ratings, translate to ordered item list and send in as list
      //where it will fall through the sort switch and retain order
      this.props.sortList(this.props.list, e.target.id, this.props.currentList)
    } else {
      this.props.sortList(this.props.list, e.target.id, this.props.currentList)
    }
  }

  render() {
    const items = this.props.list.map((item) => {
      const r = this.props.ratings.find(r => item.id === r.item_id) || 0
      return <ListItem item={item} rating={r.rating} key={item.id} />
    })
    if (this.props.seeFriend) {
      console.log("friendProfile:", this.props.friendProfile)
      return(
        <div id="list-items-container">
          <h2 id="friend-list-title">{`${this.props.friendProfile.first_name.toLowerCase()}'s ${this.props.currentFriendList} list`}</h2>
          <div id="sort-button-container">
            <button className="sort-button" id='rating' onClick={this.handleSort}>rating</button>
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
