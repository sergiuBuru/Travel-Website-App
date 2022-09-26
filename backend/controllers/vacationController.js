const Vacation = require('../models/vacationModel')
const mongoose = require('mongoose')

// get all vacations
const getVacations = async (req, res) => {
  const user_id = req.user._id

  const vacations = await Vacation.find({user_id}).sort({createdAt: -1})

  res.status(200).json(vacations)
}

// get a single vacation
const getVacation = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such vacation'})
  }

  const vacation = await Vacation.findById(id)

  if (!vacation) {
    return res.status(404).json({error: 'No such vacation'})
  }
  
  res.status(200).json(vacation)
}


// create new vacation
const createVacation = async (req, res) => {
  const {title, vacationDate} = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }
  if(!vacationDate) {
    emptyFields.push('vacationDate')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const vacation = await Vacation.create({title, vacationDate, user_id})
    res.status(200).json(vacation)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a vacation
const deleteVacation = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such vacation'})
  }

  const vacation = await Vacation.findOneAndDelete({_id: id})

  if (!vacation) {
    return res.status(400).json({error: 'No such vacation'})
  }

  res.status(200).json(vacation)
}

// update a vacation
const updateVacation = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such vacation'})
  }

  const vacation = await Vacation.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!vacation) {
    return res.status(400).json({error: 'No such vacation'})
  }

  res.status(200).json(vacation)
}


module.exports = {
  getVacations,
  getVacation,
  createVacation,
  deleteVacation,
  updateVacation
}