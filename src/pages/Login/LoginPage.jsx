import {Alert, AlertIcon, Box, Button, chakra, FormLabel, Input} from "@chakra-ui/react";
import {useContext} from "react";
import AuthContext from "../../context/AuthContext";
import {Link} from "react-router-dom";

const LoginPage = () => {
  let {loginUser} = useContext(AuthContext)

  return (
    <>
      <Alert status='warning'>
        <AlertIcon />
        This site's is backend is hosted on free render server. Whaterever you add it will be vanished after 30mins. Thank you.
      </Alert>
      <Box>
        <chakra.form onSubmit={loginUser}>
          <FormLabel>Username</FormLabel>
          <Input name="username" type='text'/>
          <br/>
          <FormLabel>Password</FormLabel>
          <Input type='password' name="password" />
          <Button type='submit' w='100%' my={5} variant='outline'>
            Login
          </Button>
          <p>If your new please <Button colorScheme='blue'><Link to='/signup'>Sign up</Link></Button></p>
        </chakra.form>
      </Box>

    </>
  )
}

export default LoginPage