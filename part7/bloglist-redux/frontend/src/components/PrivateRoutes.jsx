import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const PrivateRoutes = () => {
  const user = useSelector(state => {
    return state.user
  })  


  while (user.success === false) {
    return null
  }

  return (
      user.user ? <Outlet/> : <Navigate to='/'/> 
    )
}

export default PrivateRoutes