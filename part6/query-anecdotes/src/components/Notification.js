import { useNotificationValue, useNotificationDispatch } from '../NotificationContext'
const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  const dispatch = useNotificationDispatch()
  const notice = useNotificationValue()
  if (notice === '') {
    return null
  } else {
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, 5000 )

    return (
      <div style={style}>
        {notice}
      </div>
    )
  }
}

export default Notification
