const fs = require('fs')

// const book = {
//     title: 'ego is the enemy',
//     author: 'Ryan Holiday'
// }

// const bookJSON = JSON.stringify(book)

// fs.writeFileSync('1-json.json', bookJSON)      

// const dataBuffer = fs.readFileSync('1-json.json') //get binary data
// const dataJSON = dataBuffer.toString() //into a string
// const data = JSON.parse(dataJSON) //into an object
// console.log(data.title) 

const personBuffer = fs.readFileSync('1-json.json')
const personJSON = personBuffer.toString()
const personData = JSON.parse(personJSON)
personData.name = 'Buse'
const personJSON1 = JSON.stringify(personData)
fs.writeFileSync('1-json.json', personJSON1)
console.log(personData.name)


