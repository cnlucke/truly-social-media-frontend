import React from 'react'
import { connect } from 'react-redux'
import { sendComment } from '../actions/commentActions'

class CommentForm extends React.Component {
  state = {
    comment: '',
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const username = this.props.currentUser.first_name + ' ' + this.props.currentUser.last_name
    this.props.sendComment(this.props.item.id, this.state.comment, this.props.currentUser.id, this.props.item.api_id, username)
    this.setState({comment: ''})
  }

  handleOnChange = (e) => {
    this.setState({ comment: e.target.value })
  }

  render() {
    return (
      <div id="comment-form-container">
        <form onSubmit={this.handleSubmit} id="comment-form">
          <textarea type="text"
                  name='content'
                  id="comment-input"
                  placeholder="enter comment"
                  autoComplete='on'
                  value={this.state.comment}
                  onChange={this.handleOnChange}/>
                <input id="comment-submit" type="submit" value="add comment" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    item: state.items.itemChoice
  }
}
export default connect(mapStateToProps, { sendComment })(CommentForm)
