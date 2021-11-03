const request = require('request');



const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (err, res, body)=>{

    if (err) {
      return callback(err, null);
    }
    // if non-200 status, assume server error
    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let ip = JSON.parse(body)['ip'];
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://api.freegeoip.app/json/${ip}?apikey=a1aa3110-3cc9-11ec-a3d4-c7f659fe551b`, (err, res, body)=> {
    if (err) {
      return callback(err, null);
    }
    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching CO-Ordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    let data = JSON.parse(body);

    //destructure the full object into just lat and long object
    const {latitude,longitude, ...partialdata} = data;
    let latLong = {latitude, longitude};

    callback(null, latLong);
  });
};


const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords['latitude']}&lon=${coords['longitude']}`, (err, res, body) => {
    if (err) {
      return callback(err, null);
    }

    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching CO-Ordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    let data = JSON.parse(body);
    let listofRes = data['response'];
    callback(null, listofRes);
  });
};


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((err, ip) => {
    if (err) {
      return callback(err, null);
    }
    fetchCoordsByIP(ip, (err, loc) => {
      if (err) {
        return callback(err, null);
      }
      fetchISSFlyOverTimes(loc, (err, passes) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, passes);
      });
    });
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };

