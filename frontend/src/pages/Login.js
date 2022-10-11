import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { useNavigate } from "react-router-dom"

import { Stack, TextField, Button, Alert} from "@mui/material"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    await login(email, password)
    navigate("/")
  }

  return (
    <div className="login-container">
      <div className="login-div">
        <Stack spacing={3} className="login-stack">
          <div className="login-title-div">
            <h2>Log in</h2>
          </div>
          <TextField 
            id="outlined-basic" 
            label="Email" 
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField 
            id="outlined-password-input"
            label="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" disabled={isLoading} onClick={handleLogin}>Log in</Button>
          {error && <Alert severity="error">{error}</Alert>}
        </Stack>
      </div>
    </div>
  )
}

export default Login