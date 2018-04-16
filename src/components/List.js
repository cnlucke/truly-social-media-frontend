import React from 'react'
import { connect } from 'react-redux'
import ListItem from './ListItem'
import Search from '../components/Search'
import { sortList } from '../actions/listActions'


class List extends React.Component {

  componentWillReceiveProps(nextProps) {
    console.log('NEXTPROPS:', nextProps)
  }



  handleSort = (e) => {
    this.props.sortList(this.props.list, e.target.id, this.props.currentList)
  }

  render() {
    const items = this.props.list.map((item) => {
      const r = this.props.ratings.find(r => item.id === r.item_id) || 0
      return <ListItem item={item} rating={r.rating} key={item.id} />
    })
    if (this.props.seeFriend) {
      return(
        <div id="list-items-container">
          <h2 id="friend-list-title">{`${this.props.friendProfile.first_name.toLowerCase()}'s ${this.props.seeFriendList} list`}</h2>
          {items}
        </div>
      )
    } else {
      return (
        <div id="list-items-container">
          <Search />
          <div id="sort-button-container">
            {(this.props.currentList === 'seen') ?
            <button className="sort-button" id='rating' onClick={this.handleSort}>rating</button>
            : null}
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
    seeFriendList: state.friends.seeFriendList,
    ratings: state.lists.ratings,
  }
}

export default connect(mapStateToProps, { sortList })(List)
