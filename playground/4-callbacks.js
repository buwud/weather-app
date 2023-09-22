setTimeout(() =>
{
    console.log('2 seconds are up ')
}, 2000)

const geocode = (address, callback) =>
{

    setTimeout(() =>
    {
        const data = {
            langtitude: 1,
            longitude: 2
        }
        callback(data)
    }, 2000)
}

geocode('phili', (data) =>
{
    console.log(data)
})


// Goal: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!

const add = (num1, num2) =>
{
    setTimeout(() =>
    {
        const result = num1 + num2
        return result
    }, 2000)
}

/*add(1, 4, (sum) =>
{
    console.log(sum)
})*/
console.log(add(1,4))