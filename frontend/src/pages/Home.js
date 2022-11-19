import { useEffect, useState} from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import uuid from 'react-uuid'
// Components
import Footer from '../components/Footer'

const Home = () => {
  const { user } = useAuthContext()
  const [photosUrls, setUrls] = useState([])
  const [photosLocations, setLocations] = useState([])

  // fetch public photos from all users' vacations
  const fetchPhotosInfo = () => {
    fetch('home')
    .then(res => res.json())
    .then(data => {
      data.photos.forEach((photo) => {
        setUrls(current => [...current, photo.photo_url])
        setLocations(current => [...current, photo.photo_location])
      })
      console.log(data.photos)
    })
  }

  useEffect(() => {
    fetchPhotosInfo()
  }, [])

  return (
    <div className="home-container">
      <h1 style={{marginTop: 30}}>Users' Vacation Photos</h1>
    {photosUrls.map((url, index) => {
      return (
        <div className="home-photo-div div-shadow-wrapper" key={uuid()}>
          <div className="photo-div" key={uuid()}>
            <img className="home-photo" src={url} key={url} alt='err'></img> 
          </div>
          <p key={uuid()}>📌 {photosLocations[index]}</p>  
        </div> 
      )
    })}


      {/*  Display the footer only when the user is not looged in  */}
      { !user && <Footer /> }
    </div>
    
  )
}

export default Home