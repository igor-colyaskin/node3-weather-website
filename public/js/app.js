
const weather = document.querySelector('form')
const input = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weather.addEventListener('submit', (event) => {
  event.preventDefault()

  messageOne.textContent = 'Loading ...'
  messageTwo.innerHTML = ''

  fetch(`/weather?address=${input.value}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = 'Error...'
        messageTwo.textContent = data.error
      } else {
        messageOne.textContent = 'The weather in ' + data.location + ' is: '
        messageTwo.innerHTML = `${data.forecast.weather_description},<br>
        temperature is ${data.forecast.temperature} degree,<br>
        humidity is ${data.forecast.humidity}% and<br>
        pressure - ${data.forecast.pressure} mm`
      }
    })
  })
})