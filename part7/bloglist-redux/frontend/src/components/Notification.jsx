import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector((state) => {
    return state.notification
  })

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