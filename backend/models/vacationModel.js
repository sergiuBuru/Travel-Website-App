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
  placesToVisit: [{
    type: String,
    required: true
  }],
  dontForgetList: [{
    type: String,
    required: true
  }],
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Vacation', vacationSchema)