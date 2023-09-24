const path = require('path')
const express = require('express')


console.log(__dirname)
console.log(path.join(__dirname, '../public'))


const app = express()
const publicDir = path.join(__dirname, '../public')

app.use(express.static(path.join(publicDir)))//root



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