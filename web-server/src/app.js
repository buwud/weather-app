const path = require('path')
const express = require('express')


console.log(__dirname)
console.log(path.join(__dirname, '../public'))


const app = express()
const publicDir = path.join(__dirname, '../public')


app.set('view engine', 'hbs')
app.use(express.static(path.join(publicDir)))//root

app.get('', (req, res) =>
{
    res.render('index', {
        title: 'weather',
        author: 'buse duran'
    })
})

app.get('/about', (req, res) =>
{
    res.render('about', {
        title: 'about',
        author: 'buwu duran'
    })
})

app.get('/help', (req, res) =>
{
    res.render('help', {
        title: 'help message',
        author: 'buse'
    })
})

app.get('/weather', (req, res) =>
{
    res.send({
        location: 'kayseri',
        forecast: 38
    })
})

app.listen(3000, () =>
{
    console.log('server is up on port 3000')
})