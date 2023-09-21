const https = require('https');

const forecast = async (latitude, longitude, callback) =>
{
    const options = {
        method: 'GET',
        hostname: 'open-weather13.p.rapidapi.com',
        path: `/city/latlon/${ latitude }/${ longitude }`, // Properly format the path
        headers: {
            'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com',
            //key
        },
    };

    const req = https.request(options, function (res)
    {
        let data = '';

        res.on('data', function (chunk)
        {
            data += chunk;
        });

        res.on('end', function ()
        {
            try
            {
                const response = JSON.parse(data);
                callback(undefined, 'Currently ' + (response.main.temp - 273.15).toFixed(2) + ' degrees out there with ' + response.weather[0].description + '. The wind is blowing at ' + response.wind.speed + 'km/h');
            } catch (error)
            {
                callback(error, null);
            }
        });

    });

    req.on('error', function (error)
    {
        callback(error, undefined);
    });

    req.end();

};

module.exports = forecast;