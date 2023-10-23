let logList = require('./log.json')
const fs = require('fs')

const doLog = function () {
    const date0 = new Date()
    fs.readFile('log.json', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
        }

        if (logList.length != 0) {
            logList = JSON.parse(data);
            if (!Array.isArray(logList)) {
                logList = [];
            }
        }
        else {
            logList = [];
        }

        logList.push({ "Date": date0 });

        fs.writeFile('log.json', JSON.stringify(logList), (writeErr) => {
            if (writeErr) {
                console.error('Error occured writing the JSON file')

            } else {
                console.log('Date written to JSON file')

            }
        })
    })
    const sameDayOfMonth = logList.filter((entry) => {
        const entryDate = new Date(entry.Date);
        return entryDate.getDate() === date0.getDate();
    });

    return sameDayOfMonth.length;
}
module.exports = {
    doLog: doLog
}