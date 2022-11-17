// hooks
import { useState, useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import { Button, Stack, ImageList, ImageListItem, TextField, Radio, RadioGroup, FormControlLabel } from '@mui/material'

const PhotoGallery = ({vacationId, vacationPhotos}) => {
  const { user } = useAuthContext()
  // photo the user selects for upload
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  // all photos the user currently has stored on the server
  const [allPhotos, setAllPhotos] = useState(vacationPhotos)
  // all photos fetched since loading this page
  const [fetchedPhotos, setFetchedPhotos] = useState(vacationPhotos)
  const [photoLocation, setPhotoLocation] = useState('')
  // flag for whether the user wants the selected photo to be public or private
  const [pub, setPublic] = useState(false)

  const handleSelect = (e) => {
    const photo = e.target.files[0]
    setSelectedPhoto(photo)
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    // create the request body for posting the iamge
    const cloudinaryData = new FormData()
    cloudinaryData.append('file', selectedPhoto)
    cloudinaryData.append('upload_preset', 'travel-app-preset')

    // post the photo to Cloudinary
    const cloudinaryResponse = await fetch('https://api.Cloudinary.com/v1_1/doio2uvsw/image/upload', {
      method: 'POST',
      body: cloudinaryData
    })
    const photoJson = await cloudinaryResponse.json()
    console.log(photoJson.url)

    const url = photoJson.url
    const s = pub ? 'public' : 'private'

    // post the selected photo url, status and location to the backend
    const response = await fetch(`/vacations/${vacationId}/upload_photo`, {
      method: 'POST',
      headers: {
        'Authorization' : `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'photoUrl': url, 'photoLocation': photoLocation, 'status': s})
    })
    if(!response.ok) {
      console.log("res no ok")
    }
    if(response.ok) {
      console.log('before setting new photo', allPhotos)
      setAllPhotos(allPhotos.concat(url))
      console.log('after setting new photo', allPhotos)

      setSelectedPhoto(null)
      setPhotoLocation('')
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
        </div>
      </div>
      {selectedPhoto &&
      <div className="selected-photo-form">
        <div className="vacation-selected-photo">
          {"Selected file: " + selectedPhoto.name}
        </div>
        <div className="vacation-photo-location-div">
          <TextField 
            id="outlined-basic" 
            label="Photo Location" 
            variant="outlined"
            value={photoLocation}
            onChange={(e) => setPhotoLocation(e.target.value)} />
        </div>
        <div className="selected-photo-radiogroup">
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="private" control={<Radio />} label="Private" onChange={e => setPublic(false)}/>
            <FormControlLabel value="public" control={<Radio />} label="Public" onChange={e => setPublic(true)}/>
          </RadioGroup>
        </div>
        <div className="upload-button-div">
          <Button variant="contained" size="small" onClick={handleUpload}>Upload Photo</Button>
        </div>
      </div>  
      }
      <div className="photo-gallery">
        <ImageList  cols={2} rowHeight={150} variant="quilted">
          {allPhotos.map((photo) => (
            <ImageListItem key={photo}>
              <img
                src={photo}
                loading="lazy"
                alt='err'
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div> 
    </Stack>     
   

  )
}

export default PhotoGallery