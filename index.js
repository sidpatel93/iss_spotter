const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIP('99.234.149.106', (err,data)=>{
  if (err) {
    console.log(err);
  }
  console.log(data);
});

fetchISSFlyOverTimes({ latitude: 43.7387, longitude: -79.7271 } , (err, data)=> {

  if (err) {
    console.log(err);
  }
  console.log(data);

});

