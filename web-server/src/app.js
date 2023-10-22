const fs = require('fs')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const request = require('request');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

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
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a location!'
        })
    }
    const input = req.query.address
    console.log(req.query.address)
    geocode(input, (error, { latitude = 0, longitude, address } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                address,
                forecastData
            })
        })
    })
})
app.use(express.json())
app.post('/log', (req, res) => {
    const date = req.body

    fs.readFile('log.json', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return res.status(500).json({ error: 'Failed to read the data from the log file' });
        }
        let jsonData = JSON.parse(data);
        if (!Array.isArray(jsonData)) {
            jsonData = [];
        }

        jsonData.push(date);

        fs.writeFile('log.json', JSON.stringify(jsonData), (writeErr) => {
            if (writeErr) {
                console.error('Error occured writing the JSON file')
                res.status(500).json({ error: 'Failed to write the data to log file' })
            } else {
                console.log('Date written to JSON file')
                res.status(200).json({ message: 'Date saved successfully' })
            }
        })
    })


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

app.listen(3000, () => {
    console.log('server is up on port 3000')
})