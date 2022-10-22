import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect } from "react";
import { useState } from "react";

// components
import { Fab } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import VacationCard from "../components/VacationCard";

const Vacations = () => {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const [vacations, setVacations] = useState([])

  useEffect( () => {
    // Fetch the vacations
    fetch('/vacations', {
      headers: {'Authorization' : `Bearer ${user.token}`}
    })
    .then(response => {
      if(!response.ok) {
        throw new Error('HTTP error')
      }
      return response.json()
    })
    .then(vacations => setVacations(vacations))
    .catch(err => console.log(err))
  }, [user.token])

  const handleClick = () => {
    navigate('/add-vacation')
  }

  return (
    <div className="vacations-container">
      <div className="vacations-container">
        {vacations && vacations.map((vacation) => (
          <VacationCard key={vacation._id} vacation={vacation} />
        ))}
      </div> 
      <div className="add-button-container">
        <Fab 
            color="primary" 
            aria-label="add" 
            className="add-vacations-button"
            onClick={handleClick}>
          <AddIcon />
        </Fab>
      </div>
    </div>
  )
}

export default Vacations