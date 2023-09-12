const request = require('request');

const options = {
    method: 'GET',
    url: 'https://yahoo-weather5.p.rapidapi.com/weather',
    qs: {
        location: 'sunnyvale',
        format: 'json',
        u: 'c'
    },
    headers: {
        //apikey
        'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
    }
};

request(options, function (error, response, body)
{
    if (error) throw new Error(error);
    const weatherData = JSON.parse(body)

    console.log(weatherData.current_observation.condition.text + '. It is currently ' + weatherData.current_observation.condition.temperature + ' degrees out there. The speed of the wind is ' + weatherData.current_observation.wind.speed + ' km/h.')
});