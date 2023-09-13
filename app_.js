const request = require('request');

const options = {
    method: 'GET',
    url: 'https://yahoo-weather5.p.rapidapi.com/weather',
    json: true,
    qs: {
        location: 'sunnyvale',
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
    if (error) throw new Error(error);
    //const weatherData = JSON.parse(body)
    console.log(body.current_observation.condition.text + '. It is currently ' + body.current_observation.condition.temperature + ' degrees out there. The speed of the wind is ' + body.current_observation.wind.speed + ' km/h.')
});

const geocodeOptions = {
    method: 'GET',
    url: 'https://trueway-geocoding.p.rapidapi.com/Geocode',
    json: true,
    qs: {
        address: '505 Howard St, San Francisco',
        language: 'en'
    },
    headers: {
        //key
        'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
    }
};

request(geocodeOptions, function (error, response, body)
{
    if (error) throw new Error(error);

    const latitude = response.body.results[0].location.lat
    const longitude = response.body.results[0].location.lng
    console.log(latitude, longitude)
});