const request = require('request')



const fetchMyIP = function(callback) { 
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (err, res, body)=>{

    if (err) {
      return callback(error, null);
    }
    // if non-200 status, assume server error
    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let ip = JSON.parse(body)['ip']
    callback(err, ip)
  })
}

const fetchCoordsByIP = function(ip, callback){
  request(`https://api.freegeoip.app/json/${ip}?apikey=a1aa3110-3cc9-11ec-a3d4-c7f659fe551b`, (err, res, body)=> {
    if(err){
      return callback(err, null)
    }
    if(res.statusCode !== 200){

    }

    let data = JSON.parse(body)

    //destructure the full object into just lat and long object
    const {latitude,longitude, ...partialdata} = data
    let latLong = {latitude, longitude}

    callback(err, latLong)
  })
}

module.exports = { fetchMyIP, fetchCoordsByIP };

