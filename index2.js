const {nextISSTimesForMyLocation} = require('./iss_promised')

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


nextISSTimesForMyLocation()
  .then((passTime) => {
    printPassTimes(passTime)
  });