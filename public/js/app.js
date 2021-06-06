
const weather = document.querySelector('form')
const input = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weather.addEventListener('submit', (event) => {
  event.preventDefault()

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  fetch(`http://localhost:3000/weather?address=${input.value}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = 'Error...'
        messageTwo.textContent = data.error
      } else {
        messageOne.textContent = 'The weather in ' + data.location + ' is: '
        messageTwo.textContent = data.forecast.weather_description + ', temperature is ' + data.forecast.temperature + ' degree'
      }
    })
  })
})