console.log('clientside js file is loaded');

const weatherForm = document.querySelector('form')
const button = document.querySelector('button')
const delButton = document.querySelector('.del-button')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//at first they are not visible
function showMessages() {
    messageOne.style.display = 'block'
    messageTwo.style.display = 'block'
}
function clearAll() {
    messageOne.style.display = 'none'
    messageTwo.style.display = 'none'
    search.value = ''
}

weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const location = search.value;

    messageOne.textContent = 'Loading...'
    console.log('clicked')
    button.style.cursor = 'auto'
    button.disabled = true

    try {
        const response = await fetch('http://localhost:3000/weather?address=' + location, { timeout: 6000 })

        if (response.ok) {
            response.json().then((data) => {

                if (data.error) {
                    messageOne.textContent = data.error
                    messageTwo.textContent = '...'
                } else {
                    messageOne.textContent = data.address
                    messageTwo.textContent = data.forecastData
                    const condition = data.condition

                    //sunny - cloudy - clear - fog - rain - 
                    showMessages()
                }
            });
        }
        else {
            throw new Error('Request failed')
        }

        setTimeout(function () {
            button.disabled = false
            button.style.cursor = 'pointer'
        }, 1000)

    }
    catch (error) {
        messageOne.textContent = 'Unable to find the location! Try another search.' //abort 
        messageTwo.textContent = '...'
        setTimeout(function () {
            button.disabled = false
            button.style.cursor = 'pointer'
        }, 1000)
    }
});

async function fetchWithTimeout(resource, options = {}) {
    button.style.cursor = 'auto'
    const { timeout = 8000 } = options

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout)

    const response = await fetch(resource, {
        ...options,
        signal: controller.signal
    });
    clearTimeout(id)

    return response
}

document.querySelector('.search-box button').addEventListener('click', function () {
    showMessages()
})
document.querySelector('.del-button').addEventListener('click', function (e) {
    e.preventDefault()
    clearAll()
})