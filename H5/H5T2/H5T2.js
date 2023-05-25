const user = require('./user')

let userName = "Yauheni Baikou";
let userLocation = "Jyvaskyla";
let userBirthdate = user.birthdate;

console.log(`${user.getName(userName)} lives in  ${user.getLocation(userLocation)} and was born on ${userBirthdate} `)