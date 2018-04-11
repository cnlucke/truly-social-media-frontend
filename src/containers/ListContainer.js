import React from "react";
import { connect } from "react-redux";
import List from '../components/List'
import SortableList from '../components/SortableList'
import ItemModal from '../components/ItemModal'
import RecommendedList from '../components/RecommendedList'
import FriendsList from '../components/FriendsList'
import { fetchComments } from '../actions/commentActions'

class ListContainer extends React.Component {
  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.fetchComments();
    }
  }

  render () {
    if (this.props.showItem) {
      return (
        <ItemModal />
      )
    } else {
      switch (this.props.currentList) {
        case 'next':
          return (<SortableList list={this.props.next}/>)
        case 'watching':
          return (<List list={this.props.watching}/>)
        case 'seen':
          return (<List list={this.props.seen}/>)
        case 'recommended':
          return (<RecommendedList list={this.props.recommended}/>)
        case 'friends':
          return (<FriendsList list={this.props.friends}/>)
        default:
          return null
      }
    }
  }
}

export default connect((state) => ({
  showItem: state.items.showItem,
  currentList: state.lists.currentList,
  next: state.lists.next,
  watching: state.lists.watching,
  seen: state.lists.seen,
  recommended: state.lists.recommended,
  friends: state.lists.friends,
}), { fetchComments })(ListContainer)
