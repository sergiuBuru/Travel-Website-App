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
  attractions: [{
    type: String,
    required: false
  }],
  dontForgetList: [{
    type: String,
    required: false
  }],
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Vacation', vacationSchema)