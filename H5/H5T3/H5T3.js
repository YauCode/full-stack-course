const fs = require('fs');

fs.readFile('numbers.txt', (error, data) => {
    if (error) console.error(error)
    else {
        console.log("Reading file and calculate a sum...")
        let numbers = data.toString().split(',')
        let sum = 0;
        numbers.forEach(element => {
            sum += parseInt(element)
        });
        console.log(`Sum is ${sum}`)
    }
})
