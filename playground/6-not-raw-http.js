const request = require('request')

const url = 'https://api.weatherapi.com/v1/current.json?key=2cc9890303994980820172826231109&q=ankara&aqi=no'

request({ url, json: true }, (error, { body }) =>
{
    if (error)
    {
        console.log('unable to connect to the server')
    }
    else if (body.error)
    {
        console.log('unable to find location')
    }
    else
    {
        console.log(body)
    }
})