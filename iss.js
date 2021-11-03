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

module.exports = { fetchMyIP };