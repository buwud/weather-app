const request = require('request');

const geocode = (address, callback) =>
{
    const geocodeOptions = {
        method: 'GET',
        url: 'https://trueway-geocoding.p.rapidapi.com/Geocode',
        json: true,
        qs: {
            address: address,
            language: 'en'
        },
        headers: {
            //key
            'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
        }
    };

    request(geocodeOptions, (error, { body }) =>
    {
        if (error)
        {
            callback('Unable to connect to the server!', undefined)
        } else if (body.results.length === 0)
        {
            callback('Unable to find the location!', undefined)
        } else
        {
            callback(undefined, {
                latitude: body.results[0].location.lat,
                longitude: body.results[0].location.lng,
                address: body.results[0].address,

            })
        }
    })
}
module.exports = geocode