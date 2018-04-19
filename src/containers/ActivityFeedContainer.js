import React from 'react'
import { connect } from 'react-redux'
import { fetchActivityFeed, setActivityFeed } from '../actions/activityActions'
import { ActionCable } from 'react-actioncable-provider';

class ActivityFeedContainer extends React.Component {
  componentDidMount() {
    this.props.fetchActivityFeed()
  }

  handleSocketResponse = data => {
    console.log("activity socket response!", data)
    switch (data.type) {
      case 'SET_ACTIVITY':
       		this.props.setActivityFeed(data.payload)
       		break;
      default:
    }
  };

  render() {
    // only shows last 10 items -- currently grabs everything so will need to be updated to only grab friends' activities
    const items = this.props.activity.slice(0,10).map(a => {
      return <p className='activity-item' key={a.id}>**{a.body} - <small>{a.created_at}</small></p>
    })
    return (
      <div id='activity-feed-container'>
        <ActionCable
              channel={{ channel: 'ActivityFeedChannel' }}
              onReceived={this.handleSocketResponse}
            />
        <h2 id='activity-title'>recent activity</h2>
        <div id='activity'>{items}</div>
      </div>
    )
  }
}

export default connect((state) => ({activity: state.activity.activity}), { fetchActivityFeed, setActivityFeed })(ActivityFeedContainer)
