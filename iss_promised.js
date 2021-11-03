const request = require('request-promise-native')

const fetchMyIP = () =>{
  return request('https://api.ipify.org?format=json')
}

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body)['ip']
  return request(`https://api.freegeoip.app/json/${ip}?apikey=a1aa3110-3cc9-11ec-a3d4-c7f659fe551b`)
}

const fetchISSFlyOverTimes = (body) => {
  const {latitude, longitude} = JSON.parse(body)
  
  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`)
}

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {

      //destructure the return object to get only get the value of 'response' key
      const {response} = JSON.parse(data)
      return response
    })
}

module.exports = {nextISSTimesForMyLocation}