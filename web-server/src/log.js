const fs = require('fs')
const moment = require('moment')
let jsonData

const doLog = function () {
    try {
        const json = fs.readFileSync('log.json', 'utf-8')
        jsonData = JSON.parse(json)
    }
    catch (error) {
        console.error('error reading or parsing json ')
        jsonData = { Date: '', Counter: 0 }
    }

    const currDate = moment().format('YYYY-MM-DD')
    const jsonDate = moment(jsonData[0].Date).format('YYYY-MM-DD')

    if (jsonDate === currDate) {
        jsonData[0].Counter += 1
    }
    else {
        jsonData[0].Date = currDate
        jsonData[0].Counter = 1
    }

    fs.writeFileSync('log.json', JSON.stringify(jsonData, null, 2), 'utf-8');

    // console.log('Current Date:', currDate);
    // console.log('json date: ', jsonDate)
    // console.log('Counter:', jsonData[0].Counter);

    return jsonData[0].Counter
}
module.exports = {
    doLog: doLog
}