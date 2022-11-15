require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const homeRoutes = require('./routes/home')
const userRoutes = require('./routes/user')
const vacationRoutes = require('./routes/vacations')
const servefavicon = require('serve-favicon')

// create the express app
const app = express()

// middleware
app.use(express.json())

// app.use(favicon(__dirname + '/favicon.ico'));

// print the path and method of incoming requests
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.get('/', (req, res) => {
  res.send('hello traveler')
})
app.use('/home', homeRoutes)
app.use('/user', userRoutes)
app.use('/vacations', vacationRoutes)

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

