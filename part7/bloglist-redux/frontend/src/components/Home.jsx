import React from "react"

import Blogs from "./Blogs"

const Home = ({ user, blogs }) => {

  if (user) {
      return (
      <section className="home">
        <Blogs user={user} blogs={blogs} />
      </section>
    )
  }
  return null
  
}

export default Home