require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

// create the express app
const app = express()

// middleware
app.use(express.json())

// print the path and method of incoming requests
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
// app.use('/', homeRoutes)
// app.use('/vacations', vacationRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to the db and listening on port', process.env.PORT)
    })
  })
  .catch(error => {
    console.log(error)
  })

