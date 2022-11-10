const express = require('express')
const {
  createVacation,
  getVacations,
  getVacation,
  deleteVacation,
  updateVacation,
  uploadVacationPhoto,
  getVacationPhotos
} = require('../controllers/vacationController')
const upload = require('../multer_upload/upload')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all vacation routes
router.use(requireAuth)

// GET all vacations
router.get('/', getVacations)

//GET a single vacation
router.get('/:id', getVacation)

// POST a new vacation
router.post('/', createVacation)

// DELETE a vacation
router.delete('/:id', deleteVacation)

// UPDATE a vacation
router.patch('/:id', updateVacation)

// POST a vacation photo to the collection
router.post('/:id/upload_photo', upload.single('photo'), uploadVacationPhoto)

// GET all the photos for a specific vacation
router.get('/:id/:photo_name', getVacationPhotos)

module.exports = router