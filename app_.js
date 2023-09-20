const request = require('request');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const input = process.argv[2]

const isNumber = (s) => !isNaN(Number(s));

if (input.length === 0)
{
    console.log('Please enter an address')
}

else if (isNumber(input.trim()) && process.argv[3] && isNumber(process.argv[3].trim()))
{
    forecast(input, process.argv[3], (error, forecastData) =>
    {
        if (error)
        {
            return console.log(error)
        }

        //console.log(data.address)
        console.log(forecastData)
    })
}
else
{
    geocode(input, (error, data) =>
    {
        if (error)
        {
            return console.log(error)
        }
        forecast(data.latitude, data.longitude, (error, forecastData) =>
        {
            if (error)
            {
                return console.log(error)
            }

            console.log(data.address)
            console.log(forecastData)
        })
    })
}