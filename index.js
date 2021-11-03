const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP('99.234.149.106', (err,data)=>{
//   if (err) {
//     console.log(err);
//   }
//   console.log(data);
// });

// fetchISSFlyOverTimes({ latitude: 43.7387, longitude: -79.7271 } , (err, data)=> {

//   if (err) {
//     console.log(err);
//   }
//   console.log(data);

// });

//===========================================
//Helper function to print the output lines
//===========================================
const printPassTimes = (passTimes)=> {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the sentences with time
  printPassTimes(passTimes);
});

