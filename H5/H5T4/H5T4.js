const http = require('http')
const hostname = '127.0.0.1'
const port = 3000
const fs = require('fs');


const server = http.createServer((req, res) => {
    fs.readFile('counter.txt', (error, data) => {
        if (error) console.error(error)
        else {
            let count = parseInt(data.toString());
            count++;
            fs.writeFile("counter.txt", count.toString(), (err) => {
                if (err)
                    console.log(err);
                else {
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'text/html')
                    res.write(`Request counter value is ${count}`)
                    res.end()
                }
            });
        }
    })

})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})

