// eslint-disable-next-line no-unused-vars
import React from 'react'

const Notifications = ({ message, isError }) => {
  if (message === null){
    return null
  }

  const notificationClasses = isError ? 'notifications error' : 'notifications'

  return (
    <div className={notificationClasses}>
      {message}
    </div>
  )
}

export default Notifications