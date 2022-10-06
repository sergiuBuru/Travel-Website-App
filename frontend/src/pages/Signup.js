import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

import { Stack, TextField, Button, Alert} from "@mui/material"

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSignup = async (e) => {
    e.preventDefault()
    await signup(email, password)
  }

  return (
    <div className="signup-container">
      {error && <Alert severity="error">{error}</Alert>}
      <div className="signup-div">
        <Stack spacing={3} className="signup-stack">
          <TextField 
            id="outlined-basic" 
            label="email" 
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField 
            id="outlined-basic"
            label="password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" disabled={isLoading} onClick={handleSignup}>Sign up</Button>
        </Stack>
      </div>
    </div>
  )
}

export default Signup