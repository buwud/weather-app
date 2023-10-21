const fs = require('fs')

const loadLogs = () => //returns logs list
{
    //read from file
    try {
        const dataBuffer = fs.readFileSync('log.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch (e) {
        //if array does not exist, create empty array
        return []
    }
}

const addLog = (title, body) => {
    const logs = loadLogs()

    logs.push({
        title: title,
        body: body
    })
    saveLog(logs)
    console.log(chalk.green.inverse('New log added!'))



}

const saveLog = (logs) => {
    const dataJSON = JSON.stringify(logs)
    fs.writeFileSync('log.json', dataJSON)
}

export {
    addLog,
    saveLog,
    loadLogs
};