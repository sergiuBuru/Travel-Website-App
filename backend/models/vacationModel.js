const mongoose = require('mongoose')

const Schema = mongoose.Schema

const vacationSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  vacationDate: {
    type: String,
    required: true
  },
  goals: {
    type: String,
    required: true
  },
  attractions: [{
    type: String,
    required: false
  }],
  dontForgetList: [{
    type: String,
    required: false
  }],
  vacationPhotos: [{
    type: String,
    require: false
  }],
  publicVacationPhotos: [{
    type: String,
    require: false
  }], 
  publicVacationPhotosLocations: [{
    type: String,
    require: false
  }],
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Vacation', vacationSchema)