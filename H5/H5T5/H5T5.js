const fs = require('fs')
const path = require('path')

if (process.argv.length <= 3 || isNaN(process.argv[2]) || isNaN(process.argv[3]) || isNaN(process.argv[4])) {
    console.log(`Usage: ${path.basename(__filename)} RANDOMIZED_NUMBERS_COUNT MIN_VALUE MAX_VALUE`)
    process.exit(-1)
}

const quantity = process.argv[2]
const min = process.argv[3]
const max = process.argv[4]

let randomNumbers = [];
let number;

for (i = 0; i < quantity; i++) {
    number = getRandomIntInclusive(min, max);
    if (!randomNumbers.includes(number)) {
        randomNumbers.push(number);
    } else if (i > 0) {
        i--;
    }
}

// Ascending Sorting
randomNumbers = randomNumbers.sort(compareNumbers);

// Random integer between two values both inclusive
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// For  Ascending Sorting
function compareNumbers(a, b) {
    return a - b;
}

console.log(randomNumbers)