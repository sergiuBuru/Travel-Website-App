import * as React from 'react'
// import { Card, CardActions, CardContent, Typography, Button } from '@mui/material'
import { Card, Button } from 'react-bootstrap'

const VacationCard = ( {vacation} ) => {
  return (
    <Card className='vacation-card'>
      <Card.Header>{vacation.vacationDate}</Card.Header>
      <Card.Body>
        <Card.Title>{vacation.title}</Card.Title>
        <Card.Text>{vacation.goals}</Card.Text>
        <Button variant="primary">See details</Button>
      </Card.Body>
    </Card>
  )
}

export default VacationCard