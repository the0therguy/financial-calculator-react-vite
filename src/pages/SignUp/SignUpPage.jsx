import {useState} from "react";
import {Box, FormControl, FormLabel, Input, chakra, Button, useToast, AlertIcon, Alert} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

const SignUpPage = () => {
  const [email, setEmail] = useState('')
  const toast = useToast()
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [firstName, setfirstName] = useState('')
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [message, setMessage] = useState('')
  const [isShown, setIsShown] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (password !== password2) {
        setMessage("Both password didn't match")
        return null
      }
      const response = await fetch(`${import.meta.env["VITE_REACT_API_URL"]}/api/v1/signup/`, {
        method: "POST",
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          username: username,
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password
        })
      })
      const signupResponse = await response.json()
      if (response.status === 201) {
        setPassword("")
        setPassword2("")
        setLastName("")
        setUsername("")
        setfirstName("")
        setEmail("")
        toast({
          title: "Your account is created.",
          description: "we are redirecting you to login page",
          status: "success",
          duration: 9000,
          isClosable: true,
        })
        setTimeout(() => {
          navigate("/login")
        }, 2000)
      }
      else {
        toast({
          title: signupResponse[Object.keys(signupResponse)][0],
          description: signupResponse[Object.keys(signupResponse)][0],
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      }
    } catch (error) {
      console.log(error)
      toast({
        title: "something went wrong.",
        description: "Something went wrong. Please try again later.",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }

  }
  const togglePassword = () => {
    setIsShown((isShown) => !isShown);
  }
  return (
    <>
      <Alert status='warning'>
        <AlertIcon />
        This site's is backend is hosted on free render server. Whaterever you add it will be vanished after 30mins. Thank you.
      </Alert>
      <Box>
        {
          message ? <p>{message}</p> : null
        }
        <chakra.form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input type='username' onChange={(e) => setUsername(e.target.value)}/>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input type='email' onChange={(e) => setEmail(e.target.value)}/>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>First Name</FormLabel>
            <Input type='text' onChange={(e) => setfirstName(e.target.value)}/>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input type='text' onChange={(e) => setLastName(e.target.value)}/>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input type={isShown ? "text" : "password"} minLength="6"
                   onChange={(e) => setPassword(e.target.value)}/>

          </FormControl>
          <FormControl isRequired>
            <FormLabel>Repeat Password</FormLabel>
            <Input type={isShown ? "text" : "password"} minLength="6"
                   onChange={(e) => setPassword2(e.target.value)}/>
            <input
              id="checkbox"
              type="checkbox"
              checked={isShown}
              onChange={togglePassword}
            />
            &nbsp;
            <label htmlFor="checkbox"> Show password </label>
          </FormControl>
          <Button type='submit' w='100%' my={5}>
            Signup
          </Button>
        </chakra.form>
        <p>Already have an account? <Button colorScheme='blue'><a href='/auth/signin'>Sign in</a></Button></p>
      </Box>
    </>
  )
}
export default SignUpPage