const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define path for Express config
const pathToPublic = path.join(__dirname, '../public')
const pathToViews = path.join(__dirname, '../templates/views')
const pathToPartials = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', pathToViews)
hbs.registerPartials(pathToPartials)

// Setup static directory to serve
app.use(express.static(pathToPublic))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    author: 'I. Kolyaskin'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Igor',
    age: 57,
    author: 'I. Kolyaskin'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    question: 'Why',
    answer: 'Because of',
    author: 'I. Kolyaskin'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) return res.send({ error: 'You must provide an address' })

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) return res.send({ error })

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) return res.send({ error })

      res.send({
        location,
        forecast: forecastData,
        address: req.query.address
      })
    })
  })
})


app.get('/help/*', (req, res) => {
  res.render('error', {
    title: 'Error page',
    errorMessage: 'Help error',
    author: 'I. Kolyaskin'
  })
})

app.get('*', (req, res) => {
  res.render('error', {
    title: 'Error page',
    errorMessage: 'Common error',
    author: 'I. Kolyaskin'
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})