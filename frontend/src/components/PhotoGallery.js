// hooks
import { useState, useEffect } from "react"
import axios from 'axios'
import { useAuthContext } from "../hooks/useAuthContext"

// components
import { Button, Stack, ImageList, ImageListItem } from '@mui/material'


const PhotoGallery = ({vacationId, vacationPhotos}) => {
  const { user } = useAuthContext()
  // photo the user selects for upload
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  // all photos the user currently has stored on the server
  const [allPhotos, setAllPhotos] = useState(vacationPhotos)
  // all photos fetched since loading this page
  const [fetchedPhotos, setFetchedPhotos] = useState([])

  const fetchImage = async () => {
    console.log('all photos: ', allPhotos)
    // keep fetching until we have fetched all the photos from the server
    if(fetchedPhotos.length < allPhotos.length) {
      const nextPhoto = allPhotos[fetchedPhotos.length]
      // console.log('fetching photo:  ', nextPhoto)
      const res = await fetch(`/vacations/${vacationId}/${nextPhoto}`, {
        headers: {'Authorization' : `Bearer ${user.token}`}
      })
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setFetchedPhotos(fetchedPhotos.concat(imageObjectURL))
    }
  }

  useEffect( () => {
    fetchImage()
  }, [fetchImage])

  const handleSelect = (e) => {
    const photo = e.target.files[0]
    setSelectedPhoto(photo)
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('photo', selectedPhoto)

    // send the user selected picture to the server
    const response = await fetch(`/vacations/${vacationId}/upload_photo`, {
      method: 'POST',
      headers: {'Authorization' : `Bearer ${user.token}`},
      body: formData
    })
    const json = await response.json()
    if(!response.ok) {
      console.log("res no ok")
    }
    if(response.ok) {
      setAllPhotos(allPhotos.concat(json.photo))
      setSelectedPhoto(null)
    }
  }

  return (
    <Stack spacing={3} className="vacation-photo-gallery-div">
      <div className="vacation-gallery-title">
        Vacation Photos
      </div>
      <div className="vacation-photo-buttons-div">
        <div className="select-button-div">
          <Button variant="contained" component="label">
            Select Photo
            <input hidden accept=".png, .jpg, .jpeg" type="file" onChange={handleSelect}/>
          </Button>
          <div className="vacation-selected-photo">
            {selectedPhoto && "Selected file: " + selectedPhoto.name}
          </div>
        </div>
        <div className="upload-button-div">
          <Button variant="contained" onClick={handleUpload}>Upload Photo</Button>
        </div>
      </div>
      <div className="photo-gallery">
        <ImageList  cols={2} rowHeight={150} variant="quilted">
          {fetchedPhotos.map((photo) => (
            <ImageListItem key={photo}>
              <img
                src={photo}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div> 
    </Stack>     
   

  )
}

export default PhotoGallery