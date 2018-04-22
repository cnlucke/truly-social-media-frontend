import React from 'react'
import { connect } from 'react-redux'
import { hideitemChoice } from '../actions/itemActions'
import { addToList } from '../actions/listActions'
import { showCommentContainer } from '../actions/commentActions'
import { withRouter } from 'react-router-dom'

class ItemModal extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  handleClick = (list) => {
    this.props.addToList(list, this.props.itemChoice, this.props.history)
  }

  itemInAnyList = () => {
    return this.props.all.filter(item => parseInt(item.api_id, 10) === parseInt(this.props.itemChoice.api_id, 10)).length > 0;
  }

  render() {
    const url = (this.props.itemChoice.poster_url) ? this.props.itemChoice.poster_url : require('../default.jpeg')
    if (this.props.showItem) {
      return (
          <div id="movie-modal" className={(this.props.showComments && this.itemInAnyList()) ? 'modal modal-left' : 'modal'}>
            <button id="close" onClick={this.props.hideitemChoice}>x</button>
            <div className='item-content' >
              <div id="movie-poster">
                <img src={url} alt="movie poster"/>
              </div>
              <p>{this.props.itemChoice.overview}</p>
              <p><b>genres:</b> {this.props.itemChoice.genres}</p>
              <p><b>release date:</b> {this.props.itemChoice.date}</p>
              <div>
                {(this.itemInAnyList()) ?
                  <button id="show-comments" onClick={this.props.showCommentContainer}>comments</button>
                  : null
                }
              </div>
            </div>
            <div id="button-container">
              <button className="add-buttons" id="add-nextlist" onClick={() => this.handleClick('next')}>
                <i className="fas fa-plus fa-sm"></i><br/>
                 add to next
              </button>
              <button className="add-buttons" id="add-watchinglist" onClick={() => this.handleClick('watching')}>
                <i className="fas fa-plus fa-sm"></i><br/>
                 add to watching
              </button>
              <button className="add-buttons" id="add-seenlist" onClick={() => this.handleClick('seen')}>
                <i className="fas fa-plus fa-sm"></i><br/>
                 add to seen
              </button>
            </div>
          </div>
      )
    }
  }
}


export default connect(state => ({
  itemChoice: state.items.itemChoice,
  showItem: state.items.showItem,
  list: state.lists.currentList,
  showComments: state.comments.showCommentContainer,
  all: state.lists.all,
}), { hideitemChoice, addToList, showCommentContainer })(withRouter(ItemModal))


 //       <img src={url} className="movie-poster" alt="movie poster"/>
 // <div className="modal-content" style ={ { backgroundImage: "url("+url+")" } }></div>
