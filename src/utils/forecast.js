const request = require('request')

const forecast = (latitude, longitude, callback) => {

  const url = `http://api.weatherstack.com/current?access_key=3f64392385150eaa1f00c4782a5ebd21&query=${latitude},${longitude}&units=m`

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Weather service is not available at now', undefined)
    } else if (body.error) {
      callback('Please check your input for weather request', undefined)
    } else {
      const { current } = body
      callback(undefined, {
        weather_description: current.weather_descriptions[0],
        humidity: current.humidity,
        pressure: current.pressure,
        temperature: current.temperature,
        feelslike: current.feelslike
      })
    }
  })
}

module.exports = forecast
