const request = require('request');

const options = {
    method: 'GET',
    url: 'https://yahoo-weather5.p.rapidapi.com/weather',
    json: true,
    qs: {
        location: 'kayseri',
        format: 'json',
        u: 'c'
    },
    headers: {
        //key
        'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
    }
};

request(options, function (error, response, body)
{
    if (error) //for basic os errors
    {
        console.log('Unable to connect to weather service!')
    } else if (response.body.error)
    {
        console.log('unable to find the location')
    } else
    {
        console.log(body.current_observation.condition.text + '. It is currently ' + body.current_observation.condition.temperature + ' degrees out there in ' + options.qs.location + '. The speed of the wind is ' + body.current_observation.wind.speed + ' km/h.')
    }

    console.log(body)
});


//Geocode**********
const geocodeOptions = {
    method: 'GET',
    url: 'https://trueway-geocoding.p.rapidapi.com/Geocode',
    json: true,
    qs: {
        address: 'Kayseri Turkey',
        language: 'en'
    },
    headers: {
        //key
        'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
    }
};

request(geocodeOptions, function (error, response, body)
{
    if (error)
    {
        console.log('Unable to connect to the server!')
    } else if (response.body.results.length === 0)
    {
        console.log('Unable to find the location!')
    } else
    {
        const latitude = response.body.results[0].location.lat
        const longitude = response.body.results[0].location.lng
        console.log(latitude, longitude)
    }
});
