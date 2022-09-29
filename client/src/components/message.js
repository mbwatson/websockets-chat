import { Fragment, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import TimeAgo from 'timeago-react'

export const Message = ({ data }) => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <strong>
          { data.userId }
        </strong>
      </div>
      <div style={{ backgroundColor: '#eee', padding: '1rem' }}>
        { data.text }
      </div>
      <div style={{ textAlign: 'right', fontSize: '75%' }}>
        <TimeAgo datetime={ data.timestamp } />
      </div>
    </div>
  )
}

Message.propTypes = {
  data: PropTypes.shape({
    text: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
  })
}

