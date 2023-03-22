import React from "react"
import { useSelector } from "react-redux"

const Home = () => {
  const user = useSelector(state => {
    return state.user
  })  

  if (!user.success) { return null } 

  return (
    <section className="home">
      Home
    </section>
  )
  
}

export default Home