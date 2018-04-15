import React from "react";
import { connect } from "react-redux";
import ItemModal from '../components/ItemModal'
import FriendModal from '../components/FriendModal'
import SortableList from '../components/SortableList'
import List from '../components/List'
import RecommendedList from '../components/RecommendedList'
import FriendsList from '../components/FriendsList'
import { fetchComments } from '../actions/commentActions'
import CommentContainer from '../containers/CommentContainer'

class ListContainer extends React.Component {
  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.fetchComments();
    }
  }

  render () {
    console.log("showComments:", this.props.showComments)
    console.log("isLoggedIn:", this.props.isLoggedIn)

    if (this.props.showItem) {
      return (
      <div id="modal-container">
        <ItemModal />
        {(this.props.showComments && this.props.isLoggedIn) ?
          (<CommentContainer />) : null}
        </div>
      )
    } else if (this.props.showFriend){
      return (
        <FriendModal />
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
          return (<FriendsList />)
        default:
          return null
      }
    }
  }
}

export default connect((state) => ({
  showItem: state.items.showItem,
  showComments: state.comments.showCommentContainer,
  friendChoice: state.friends.friendChoice,
  showFriend: state.friends.showFriend,
  currentList: state.lists.currentList,
  next: state.lists.next,
  watching: state.lists.watching,
  seen: state.lists.seen,
  recommended: state.lists.recommended,
  friends: state.lists.friends,
  itemChoice: state.items.itemChoice,
  isLoggedIn: state.users.isLoggedIn,
  all: state.lists.all,
}), { fetchComments })(ListContainer)
