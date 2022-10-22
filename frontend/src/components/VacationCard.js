import * as React from 'react'
// import { Card, CardActions, CardContent, Typography, Button } from '@mui/material'
import { Card, Button } from 'react-bootstrap'

import { useNavigate} from 'react-router-dom' 

const VacationCard = ( {vacation} ) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/vacations/${vacation._id}`, {state : vacation})
  }

  return (
    <Card className='vacation-card'>
      <Card.Header>{vacation.vacationDate}</Card.Header>
      <Card.Body>
        <Card.Title>{vacation.title}</Card.Title>
        <Card.Text>{vacation.goals}</Card.Text>
        <Button variant="primary" onClick={handleClick}>See details</Button>
      </Card.Body>
    </Card>
  )
}

export default VacationCard