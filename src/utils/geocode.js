const request = require('request')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}
    .json?access_token=pk.eyJ1IjoiaWdvci1rb2x5YXNraW4iLCJhIjoiY2twYzdiZWx6MWFuMjJubmwxd3hkbWljZSJ9.s2KR0jMkMid0vzFM-xzX_w&limit=1`
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Geolocation service is not available at now', undefined)
    } else if (!body.features || body.features.length === 0) {
      callback('Unable to find this location', undefined)
    } else {
      const [features] = body.features
      callback(undefined, {
        latitude: features.center[1],
        longitude: features.center[0],
        location: features.place_name,
      })
    }
  })
}

module.exports = geocode
