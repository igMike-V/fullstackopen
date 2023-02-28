import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ notification }) => {

  if (notification === null){
    return null
  }

  const getClasses = () => {
    return `notification ${notification.type}`
  }

  return (
    <div className={getClasses()} >
      {notification.message}
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.object
}

export default Notification