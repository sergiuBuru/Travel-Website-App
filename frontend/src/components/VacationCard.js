import * as React from 'react'
// import { Card, CardActions, CardContent, Typography, Button } from '@mui/material'
import { Card, Button } from 'react-bootstrap'

import { useNavigate} from 'react-router-dom' 

const VacationCard = ( {vacation} ) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/vacations/${vacation._id}`, {state : vacation})
  }
  console.log(vacation.vacationPhotos)
  return (
      <Card className='vacation-card div-shadow-wrapper'>
        <Card.Header>
          {vacation.vacationDate}
        </Card.Header>
        {vacation.vacationPhotos.length > 0 && <Card.Img variant="top" src={vacation.vacationPhotos[0]}></Card.Img>}
        <Card.Body>
          <Card.Title>{vacation.title}</Card.Title>
          <Card.Text>{vacation.goals}</Card.Text>
          <Button variant="primary" onClick={handleClick}>See details</Button>
        </Card.Body>
      </Card>
  )
}

export default VacationCard