// hooks 
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import uuid from 'react-uuid'

// components
import ListGroup from 'react-bootstrap/ListGroup';
import { Stack, Button, TextField } from "@mui/material"


const VacationItemList = ({items, title, buttonTittle, vacation}) => {
  const { user } = useAuthContext()
  const [newItem, setNewItem] = useState('')
  const [listItems, setListItems] = useState(items)

  const addItems = () => {
    // if the text field is not empty
    if(newItem) {
      setListItems([newItem, ...listItems])
      setNewItem('')
      console.log(listItems)
      if(title === 'Attractions') {
        vacation.attractions = [newItem, ...vacation.attractions]
      } else if(title === 'Todos') {
        vacation.dontForgetList = [newItem, ...vacation.dontForgetList]
      }
      
      // update the attractions / dont forget list fields of the vacation
      fetch(`/vacations/${vacation._id}`, {
        method: 'PATCH',
        body: JSON.stringify(vacation),
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${user.token}`}
      })
      .then(response => {
        if(!response.ok) {
          throw new Error('HTTP error')
        }
        return response.json()
      })
      .then(vacation => console.log("updated vacation is: " + vacation))
      .catch(err => console.log(err))
    }
  }

  return (
    <Stack spacing={3} className="vacation-list-div">
      <div className="vacation-list-top-div">
        <div className="vacation-list-title">{title}</div>
        <div className="vacation-list-button-div">
            <Button variant="contained" onClick={addItems}>{buttonTittle}</Button>
        </div>
      </div>
      <div className="vacation-listgroup">
        <ListGroup>
          {listItems && listItems.map((item) => {
            return <ListGroup.Item key={uuid()}>{item}</ListGroup.Item>
          })}
        </ListGroup>
        <TextField
          className="vacation-list-textfield"
          id="outlined-basic"
          label="New Attraction"
          variant="outlined"
          fullWidth
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
      </div>
    </Stack>
  )
}

export default VacationItemList