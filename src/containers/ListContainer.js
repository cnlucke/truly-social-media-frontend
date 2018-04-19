import React from "react";
import { connect } from "react-redux";
import ItemModal from '../components/ItemModal'
import SortableList from '../components/SortableList'
import List from '../components/List'
import FriendsList from '../components/FriendsList'
import { fetchComments } from '../actions/commentActions'
import CommentContainer from '../containers/CommentContainer'

class ListContainer extends React.Component {
  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.fetchComments();
    }
  }

  itemInAnyList = () => {
    if (this.props.itemChoice) {
      return this.props.all.filter(item => parseInt(item.api_id, 10) === parseInt(this.props.itemChoice.api_id, 10)).length > 0;
    } else {
      return false
    }
  }

  render () {
    console.log("in any list?", this.itemInAnyList())
    if (this.props.showItem) {
      return (
      <div id="modal-container">
        <ItemModal />
          {(this.props.showComments && this.props.isLoggedIn && this.itemInAnyList()) ?
            (<CommentContainer />) : null}
        </div>
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
          return (<List list={this.props.recommended}/>)
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
  showFriend: state.friends.showFriend,
  currentList: state.lists.currentList,
  next: state.lists.next,
  watching: state.lists.watching,
  seen: state.lists.seen,
  recommended: state.lists.recommended,
  friends: state.friends.friends,
  itemChoice: state.items.itemChoice,
  isLoggedIn: state.users.isLoggedIn,
  all: state.lists.all,
}), { fetchComments })(ListContainer)
