import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {Box, Button, Flex, Spacer, Text} from '@chakra-ui/react';
import AuthContext from '../context/AuthContext';

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <Flex align="center" justify="space-between">
      <Flex >
        <Link to="/">Home</Link>
        <Text mx="10"> | </Text>
        <Link to="/change-password">Change Password</Link>

      </Flex>

      <Flex align="">
        <Text mx="10"> | </Text>
        {user ? (
          <React.Fragment>
            <Button onClick={logoutUser}>Logout</Button>
          </React.Fragment>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
