import {  Alert,
  AlertIcon,Box, Button, chakra, FormLabel, Input, useToast} from "@chakra-ui/react";
import Header from "../../components/Header.jsx";
import {useState} from "react";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
  const toast = useToast()

  const formSubmit = async (e) => {
    e.preventDefault()
    if (password !== password2) {
      toast({
        title: "Both password doesn't match",
        description: "Both password doesn't match. Please type correctly",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
      return null
    }
    try {
      const response = await fetch(`${import.meta.env["VITE_REACT_API_URL"]}/api/v1/change-password/`,{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens?.access}`,
        },
        body: JSON.stringify({old_password: oldPassword, new_password: password})
      })
      const passwordData = await response.json()
      if (response.status === 200)
      {
        toast({
          title: "Your password has been changed",
          description: "Your password has been changed",
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      } else {
        toast({
          title: passwordData['message'],
          description: passwordData[['message']],
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      }

    } catch (e) {
      console.log(e)
    }
  }
  return (
    <>
      <Header />
      <Alert status='warning'>
        <AlertIcon />
        This site's is backend is hosted on free render server. Whaterever you add it will be vanished after 30mins. Thank you.
      </Alert>
      <Box>
        <chakra.form onSubmit={formSubmit}>
          <FormLabel>Old Password</FormLabel>
          <Input type="password" placeholder="Please type your old password" onChange={(e)=>setOldPassword(e.target.value)} required />
          <br/>
          <br/>
          <FormLabel>New Password</FormLabel>
          <Input type="password" placeholder="Please type new password" onChange={(e)=>setPassword(e.target.value)} required />
          <br/>
          <br/>
          <FormLabel>Again New Password</FormLabel>
          <Input type="password" placeholder="Please retype new password" onChange={(e)=>setPassword2(e.target.value)} required />
          <br/>
          <br/>
          <div style={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
          }}
          >
            <Button colorScheme='blue' type="submit">Submit</Button>
          </div>
        </chakra.form>
      </Box>
    </>
  )
}

export default ChangePassword