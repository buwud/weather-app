const fs = require('fs')
const https = require('https')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const util = require('util');

const request = require('request');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const log = require('./log')
const { count, error } = require('console')
const { isString } = require('util')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const port = 3000
const app = express()

//define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve 
app.use(express.static(path.join(publicDir)))//root

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        author: 'buwu'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about',
        author: 'buwu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help message',
        author: 'buwu',
        helpText: 'This is some helpful text'
    })
})

app.get('/weather', (req, res) => {

    let lat, long
    isLog = log.doLog()

    //console.log(isLog)
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a location!'
        })
    }
    const input = req.query.address
    let isParsed = true
    //console.log(req.query.address)
    try {//input parsing
        const coordinates = input.split(',')
        lat = coordinates[0].trim()
        long = coordinates[1].trim()
    } catch (error) {
        isParsed = false
        console.error('Error occured: parsing the input')
    }

    if (isLog <= 450) {
        geocode(input, (error, { latitude = 0, longitude, address } = {}) => {
            if (error) {
                return res.send({ error })
            }
            if (!isParsed) {
                lat = latitude
                long = longitude
            }
            forecast(lat, long, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }
                res.send({
                    address,
                    forecastData
                })
            })
        })
    }
    else {
        const errorMessage = 'Enough weather attempts for today, see you tomorrow :3'
        res.send({ errorMessage })
    }
})

app.get('/help/*', (req, res) => {
    res.render('helpError', {
        title: 'Error',
        author: 'buwu',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        author: 'buwu',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})

// const options = {
//     key: fs.readFileSync("privkey.pem"),
//     cert: fs.readFileSync("fullchain.pem"),
// };

// https.createServer(options, app)
//     .listen(3000, function (req, res) {
//         console.log("Server started at port 3000");
//     });