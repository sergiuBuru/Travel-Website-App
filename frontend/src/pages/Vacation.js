// components
import { Stack } from "@mui/material"
import VacationItemList from "../components/VacationItemList";
// hooks
import { useLocation } from "react-router-dom"

const Vacation = () => {
  const location = useLocation();
  const vacation = location.state;

  return (
    <div className="vacation-container">
      <Stack spacing={3} className="vacation-page-stack">
        <div className="vacation-title-div">
          <div className="vacation-title">{vacation.title}</div>
          <div className="vacation-date">{vacation.vacationDate}</div>
        </div>
        <VacationItemList 
          items={vacation.attractions} 
          title="Attractions" 
          buttonTittle="Add Attraction"
          vacation={vacation}  
        />
        <VacationItemList 
          items={vacation.dontForgetList} 
          title="Todos" 
          buttonTittle="Add to dos"
          vacation={vacation}  
        />
      </Stack>
    </div>
  )
}

export default Vacation