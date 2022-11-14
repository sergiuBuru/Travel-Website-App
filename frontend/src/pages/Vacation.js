// components
import { Stack } from "@mui/material"
import VacationItemList from "../components/VacationItemList";
import PhotoGallery from "../components/PhotoGallery";
// hooks
import { useLocation } from "react-router-dom"

const Vacation = () => {
  const location = useLocation();
  const vacation = location.state;

  return (
    <div className="vacation-container">
      <Stack spacing={3} className="vacation-page-stack">
        {/* <div className="vacation-title-div">
          <div className="vacation-title">{vacation.title}</div>
          <div className="vacation-date">{vacation.vacationDate}</div>
        </div> */}
        <div className="vacation-basic-info-div">
          <h1>{vacation.title}</h1>
          <p>{vacation.vacationDate}</p>
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
        <PhotoGallery vacationId={vacation._id} vacationPhotos={vacation.vacationPhotos}/>

      </Stack>
    </div>
  )
}

export default Vacation