import React from "react";
import { connect } from "react-redux";
import ItemModal from '../components/ItemModal'
import SortableList from '../components/SortableList'
import List from '../components/List'
import FriendsList from '../components/FriendsList'
import { fetchComments } from '../actions/commentActions'
import CommentContainer from '../containers/CommentContainer'
import { fetchActivityFeed } from '../actions/activityActions'

class ListContainer extends React.Component {
  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.fetchComments();
      this.props.fetchActivityFeed()
    }
  }

  render () {
    if (this.props.showItem) {
      return (
      <div id="modal-container">
        <ItemModal />
        <CommentContainer />
        </div>
      )
    } else {
      switch (this.props.currentList) {
        case 'next':
          return (<SortableList />)
        case 'watching':
          return (<List />)
        case 'seen':
          return (<List />)
        case 'recommended':
          return (<List />)
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
  currentList: state.lists.currentList,
  itemChoice: state.items.itemChoice,
  isLoggedIn: state.users.isLoggedIn,
  all: state.lists.all,
}), { fetchComments, fetchActivityFeed })(ListContainer)

// itemInAnyList = () => {
//   if (this.props.itemChoice) {
//     return this.props.all.filter(item => parseInt(item.api_id, 10) === parseInt(this.props.itemChoice.api_id, 10)).length > 0;
//   } else {
//     return false
//   }
// }
