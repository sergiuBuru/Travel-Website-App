const Vacation = require('../models/vacationModel')
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')

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
  const {title, vacationDate, goals} = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }
  if(!vacationDate) {
    emptyFields.push('vacationDate')
  }
  if(!goals) {
    emptyFields.push('goals')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const vacation = await Vacation.create({title, vacationDate, goals, user_id})

    res.status(200).json(vacation)
  } 
  catch (error) {
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

const uploadVacationPhoto = async (req, res) => {
  const { id } = req.params
  const photoLocation = req.body.photoLocation
  const status = req.body.status
  const url = req.body.photoUrl

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such vacation'})
  }

  const vacation = await Vacation.findOne({_id: id})

  if(!vacation) {
    return res.status(400).json({error: 'No such vacation'})
  }

  // if the photo status is private then only add it to the vacationPhotos
  // else add it to publicVacationPhotos too
  vacation.vacationPhotos.push(url)
  if(status === 'public') {
    vacation.publicVacationPhotos.push(url) 
    vacation.publicVacationPhotosLocations.push(photoLocation)
  }
  await vacation.save()

  res.status(200).send('photo saved')
}
 
const getVacationPhotos = (req, res, next) => {
  res.sendFile(path.join(process.cwd(), 'vacation_images', req.params.id, req.params.photo_name))
}

module.exports = {
  getVacations,
  getVacation,
  createVacation,
  deleteVacation,
  updateVacation,
  uploadVacationPhoto,
  getVacationPhotos
}