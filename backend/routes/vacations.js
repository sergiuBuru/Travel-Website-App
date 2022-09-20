const express = require('express')
const {
  createVacation,
  getVacations,
  getVacation,
  deleteVacation,
  updateVacation
} = require('../controllers/vacationController')
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


module.exports = router