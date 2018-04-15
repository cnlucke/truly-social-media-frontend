import React from 'react'
import { connect } from 'react-redux'
import ProfileForm from '../components/ProfileForm'

const UserProfileContainer = (props) => {
  if (props.userChoice.id === props.currentUser.id) {
    // currentuser is looking at own page. Show ProfileForm with values filled in and editable
    return (
      <div>
        <ProfileForm />
      </div>
      )
  } else {
    // currentUser is viewing a friend's page
    return (
      <div>
        UserProfileContainer
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userChoice: state.users.userProfileChoice,
    showProfile: state.users.showProfile,
    currentUser: state.users.currentUser,
  }
}

export default connect(mapStateToProps, null)(UserProfileContainer)
