import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

import { Stack, TextField, Button, Alert} from "@mui/material"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleLogin = async (e) => {
    e.preventDefault()
    await login(email, password)
  }

  return (
    <div className="login-container">
      {error && <Alert severity="error">{error}</Alert>}
      <div className="login-div">
        <Stack spacing={3} className="login-stack">
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
          <Button variant="contained" disabled={isLoading} onClick={handleLogin}>Log in</Button>
        </Stack>
      </div>
    </div>
  )
}

export default Login