import React from 'react'

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

export default Notification