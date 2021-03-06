const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

const app = express()
const port = process.env.PORT || 3000

// Defining paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/forecast', (req, res) => {
    res.render('forecast', {
        title: 'Weather',
        name: 'Govardhan Yannam'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Govardhan Yannam'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Click on this link for help',
        name: 'Govardhan Yannam'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error : 'You must provide a valid address'
        })
    }
    geocode.geocode(req.query.address, 
        (error, response) => {
            if(error) {
                return res.send({
                    error 
                })
            }
            forecast.forecast(response, (error, data) => {
                if(error) {
                    return res.send({
                        error 
                    })
                }
                res.send({
                    location : response.location,
                    forecast : data.weather_descriptions[0],
                    address : req.query.address,
                    temperature : data.temperature +' C',
                    feelslike : data.feelslike +' C'
                })
            })
        }
    )
})

app.get('', (req, res) => {
    res.render('index', {
        title: 'Varshitha',
        name: 'Govardhan Yannam',
        message: "Wish you a many many happy return of the day" 
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'error',
        message: 'Help article not found',
        name: 'Govardhan Yannam'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found',
        name: 'Govardhan Yannam'
    })
})

app.listen(port, () => {
    console.log('Application started on port : ', port)
})