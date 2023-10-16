console.log('clientside js file is loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// Function to show messages
function showMessages() {
    messageOne.style.display = 'block';
    messageTwo.style.display = 'block';
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.address;
                messageTwo.textContent = data.forecastData;
                showMessages(); // Call the function to display messages
            }
        });
    });
});

document.querySelector('.search-box button').addEventListener('click', function () {
    // Your search logic here

    // Show the messages
    showMessages();
});
