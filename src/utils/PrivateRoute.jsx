import {Route, redirect, Outlet, Navigate, useLocation} from 'react-router-dom'
import {useContext} from 'react'
import AuthContext from '../context/AuthContext'

const PrivateRoute = ({children, ...rest}) => {
  let location = useLocation()
  let {user} = useContext(AuthContext)


  return user ? <Outlet/> : <Navigate to="/login" replace state={{form: location}}/>
  // return(
  //   <Route {...rest}>{!user ? redirect("/login") :   children}</Route>
  // )
}

export default PrivateRoute;