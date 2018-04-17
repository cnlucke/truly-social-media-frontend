import React from 'react'
import { connect } from 'react-redux'

const ActivityFeedContainer = (props) => {
  console.log("ActivityFeedContainer props:", props.activity)
  const items = props.activity.slice(0,10).map(a => {
    return <p className='activity-item' key={a.id}>**{a.body} - <small>{a.created_at}</small></p>
  })

  return (
    <div id='activity-feed-container'>
      <h2 id='activity-title'>recent activity</h2>
      <div id='activity'>{items}</div>
    </div>
  )
}

export default connect((state) => ({activity: state.activity.activity}), null)(ActivityFeedContainer)
