import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import {Button} from "@chakra-ui/react";

const Header = () => {
  let {user, logoutUser} = useContext(AuthContext)
  return (
    <div>
      <Link to="/" >Home</Link>
      <span> | </span>
      {user ? (
        <p>
          <Button onClick={logoutUser}>
            Logout
          </Button>
        </p>
      ): (
        <Link to="/login" >Login</Link>
      )}

      {user &&   <p>Hello {user.username}
      </p>}

    </div>
  )
}

export default Header