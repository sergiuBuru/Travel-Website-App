const express = require('express')
const path = require('path')
const router = express.Router()
const Vacation = require('../models/vacationModel')

// GET home page
router.get('/', (req, res) => {
  // store the photos and their location
  let photos = []
  // get every vacation from the database
  Vacation.find({}, (err, vacations) => {
    // go through each vacation and randomly select one photo name and its location
    vacations.map(vacation => {
      if(vacation.publicVacationPhotos.length > 0) {
        const photoIndex = Math.floor(Math.random() * vacation.publicVacationPhotos.length)
        photos.push({
          vac_id : vacation.id,
          photo_url : vacation.publicVacationPhotos[photoIndex],
          photo_location : vacation.publicVacationPhotosLocations[photoIndex]
        })
      }
    })
    // send the photos info to the front end
    res.status(200).json({photos : photos})
  })
})


module.exports = router