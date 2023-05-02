interface NotificationProps {
  notification: string;
}

const Notifications = (props: NotificationProps) => {
  if (!props.notification) {
    return null;
  }

  return (
    <section className="notification">
      <p>{props.notification}</p>
    </section>
  )
}

export default Notifications;