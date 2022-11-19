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
      <div className="signup-div">
        <Stack spacing={3} className="signup-stack">
          <div className="signup-title-div">
            <h2>Sign up</h2>
          </div>
          <TextField 
            id="outlined-basic" 
            label="Email" 
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField 
            id="outlined-password-input"
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" disabled={isLoading} onClick={handleSignup}>Sign up</Button>
          {error && <Alert severity="error">{error}</Alert>}  
        </Stack>
      </div>
    </div>
  )
}

export default Signup