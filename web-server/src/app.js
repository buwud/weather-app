const express = require('express')

const app = express()

app.get('', (req, res) =>
{
    res.send('hello express!')
})

app.get('/help', (req, res) =>
{
    res.send('help page')
})

app.get('/about', (req, res) =>
{
    res.send('about page')
})

app.get('/weather', (req, res) =>
{
    res.send('weather page')
})

app.listen(3000, () =>
{
    console.log('server is up on port 3000')
})