import {Box, Button, chakra, FormLabel, Input} from "@chakra-ui/react";
import {useContext} from "react";
import AuthContext from "../../context/AuthContext";

const LoginPage = () => {
  let {loginUser} = useContext(AuthContext)

  return (
    <>
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
          <p>If your new please <Button colorScheme='blue'><a href='/signup'>Sign up</a></Button></p>
        </chakra.form>
      </Box>

    </>
  )
}

export default LoginPage