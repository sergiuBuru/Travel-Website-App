import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import { Stack, TextField, Button, Alert} from "@mui/material"

const VacationForm = () => {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [goals, setGoals] = useState('')
  const [vacationDate, setVacationDate] = useState('')
  const [error, setError ] = useState(null)


  const handleSubmit = async (e) => {
    const vacation = { title, vacationDate, goals }
    const response = await fetch('/vacations', {
      method: 'POST',
      body: JSON.stringify(vacation),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if(!response.ok) {
      setError(json.error)
    }
    if(response.ok) {
      setError(null)
      setTitle('')
      setGoals('')
      setVacationDate('')
      navigate('/vacations')
    }
  }

  return (
    <div className="vacation-form-container">
      <div className="vacation-form-div">
        <Stack spacing={3} className="vacation-form-stack">
          <div className="vacation-form-title-div">
            <h2>Add Vacation</h2>
          </div>
          <TextField 
            id="outlined-basic" 
            label="Title" 
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            id="outlined-textarea"
            label="Goals"
            multiline
            rows={4}
            onChange={(e) => setGoals(e.target.value)}
          />
          <TextField 
            id="outlined-basic"
            label="Date"
            variant="outlined"
            onChange={(e) => setVacationDate(e.target.value)}
          />
          <Button variant="contained" onClick={handleSubmit}>Add</Button>
          {error && <Alert severity="error">{error}</Alert>}
        </Stack>
      </div>
    </div>
  )
}

export default VacationForm