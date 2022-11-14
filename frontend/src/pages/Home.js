import { useEffect, useState} from "react";
import { useAuthContext } from "../hooks/useAuthContext";

// Components
import Footer from '../components/Footer'
import Button from '@mui/material/Button'

const Home = () => {
  const { user } = useAuthContext()
  const [fetchedPhotos, setPhotos] = useState([])
  const [photosLocations, setLocations] = useState([])

  useEffect( () => {

    // get a list of photos from random users' vacations to 
    const fetchPhotosInfo = async () => {
      const res = await fetch('/home')
      const photosInfo = await res.json()
      const photos = photosInfo.photos
      return photos
    }

    // for each photo object fetched, fetch the photo associated with it
    const fetchPhotos = async () => {
      const photos = await fetchPhotosInfo()
      console.log('fetched photos: ', photos)
      for(const photo of photos) {
        const res = await fetch(`/home/${photo.vac_id}/${photo.vac_photo}`)
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setPhotos(current => [...current, imageObjectURL])
        setLocations(current => [...current, photo.vac_location])
        console.log(imageObjectURL)
        console.log(fetchedPhotos)
      }
    }

    fetchPhotos()
  }, [])


  return (
    <div className="home-container">
      <h1 style={{marginBottom: 20}}>Users' Vacation Photos</h1>
    {fetchedPhotos.map((pic, index) => {
      return (
        <div className="home-photo-div">
          <div className="photo-div">
            <img className="home-photo" src={pic} key={pic}></img> 
          </div>
          <p>📌 {photosLocations[index]}</p>  
        </div> 
      )
    })}


      {/*  Display the footer only when the user is not looged in  */}
      { !user && <Footer /> }
    </div>
    
  )
}

export default Home