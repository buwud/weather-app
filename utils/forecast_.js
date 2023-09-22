const https = require('https');

const forecast = async (latitude, longitude, callback) =>
{
    const options = {
        method: 'GET',
        hostname: 'weatherapi-com.p.rapidapi.com',
        port: null,
        path: '/current.json?q=' + latitude + '%2C' + longitude,
        headers: {
            //key
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    const req = https.request(options, (res) =>
    {
        let data = '';

        res.on('data', (chunk) =>
        {
            data += chunk;
        });

        res.on('end', () =>
        {
            try
            {
                const parsedData = JSON.parse(data);
                if (parsedData)
                {
                    callback(null, 'Currently ' + parsedData.current.temp_c + ' degrees out there and ' + parsedData.current.condition.text + '. The wind is blowing at ' + parsedData.current.wind_kph + 'km/h');
                } else
                {
                    callback('Location data not found', null);
                }
            } catch (error)
            {
                callback(error, null);
            }
        });
    });

    req.on('error', (error) =>
    {
        callback(error, null);
    });


    req.end();

};

module.exports = forecast;