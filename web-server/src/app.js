const path = require('path')
const express = require('express')
const hbs = require('hbs')

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

app.get('', (req, res) =>
{
    res.render('index', {
        title: 'weather',
        author: 'buwu'
    })
})

app.get('/about', (req, res) =>
{
    res.render('about', {
        title: 'about',
        author: 'buwu'
    })
})

app.get('/help', (req, res) =>
{
    res.render('help', {
        title: 'help message',
        author: 'buwu',
        helpText: 'This is some helpful text'
    })
})

app.get('/weather', (req, res) =>
{
    res.render('weather', {
        location: 'kayseri',
        forecast: 38
    })
})

app.get('/help/*', (req, res) =>
{
    res.render('helpError', {
        title: 'Error',
        author: 'buwu',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) =>
{
    res.render('404', {
        title: 'Error',
        author: 'buwu',
        message: 'Page not found'
    })
})

app.listen(3000, () =>
{
    console.log('server is up on port 3000')
})