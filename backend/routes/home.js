const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router()
const Vacation = require('../models/vacationModel')

// GET home page
router.get('/', (req, res) => {
  // get a list of all directories within the vacation_images folder
  fs.readdir(path.join(process.cwd(), 'vacation_images'), { withFileTypes: true }, (error, files) => {
    if (error) throw error;
    const vacationDirectories = files
      .filter((item) => item.isDirectory())
      .map((item) => item.name);

    let photos = []
    // get every vacation from the database
    Vacation.find().where('_id').in(vacationDirectories).exec((err, vacations) => {
      // go through each vacation and randomly select one photo name and its location
      vacations.forEach(vacation => {
        if(vacation.publicVacationPhotos.length > 0) {
          const photoIndex = Math.floor(Math.random() * vacation.publicVacationPhotos.length)
          photos.push({
            vac_id : vacation.id,
            vac_photo : vacation.publicVacationPhotos[photoIndex],
            vac_location : vacation.publicVacationPhotosLocations[photoIndex]
          })
        }
      })
      // send the photos info to the front end
      res.status(200).json({photos : photos})
    });
  });
})

router.get('/:vac_id/:photo_name', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'vacation_images', req.params.vac_id, req.params.photo_name))
})
module.exports = router