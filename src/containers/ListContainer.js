import React from "react";
import { connect } from "react-redux";
import List from '../components/List'
import MediaModal from '../components/MediaModal'
import RecommendedList from '../components/RecommendedList'
import FriendsList from '../components/FriendsList'

const ListContainer = (props) => {
  if (props.showMedia) {
    return (
      <MediaModal />
    )
  } else {
    switch (props.currentList) {
      case 'next':
      return (<List list={props.next}/>)
      case 'watching':
      return (<List list={props.watching}/>)
      case 'seen':
      return (<List list={props.seen}/>)
      case 'recommended':
      return (<RecommendedList list={props.recommended}/>)
      case 'friends':
      return (<FriendsList list={props.friends}/>)
      default:
      return null
    }
  }
}

export default connect((state) => ({
  showMedia: state.media.showMedia,
  currentList: state.lists.currentList,
  next: state.lists.next,
  watching: state.lists.watching,
  seen: state.lists.seen,
  recommended: state.lists.recommended,
  friends: state.lists.friends,
}), null)(ListContainer)

//word[0].toUpperCase() + word.substr(1);
