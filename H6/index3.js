const express = require('express')
const app = express()
const port = 3000
app.use(express.json())
const fs = require('fs');
app.use(express.urlencoded({ extended: true }))

// create logger
const logger = (request, response, next) => {
    const date = new Date()
    const lDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    const log = `${lDate}: ${request.method} ${request.url}\n`
    console.log(log)

    //Add Log-data to log.txt
    fs.appendFile('log.txt', log, (err) => {
        if (err) throw err;
    })

    next()
}

// use own made logger middleware in express app
app.use(logger)


app.listen(port, () => {
    console.log('Example app listening on port 3000')
})

let users =
    [
        { 'id': '1', 'name': 'Kirsi Kernel' },
        { 'id': '2', 'name': 'Matti Mainio' }
    ]


const header = "<a href='/listUsers'>List users</a> | <a href='/addUser'>Add user</a><hr>"

const htmlform = `
    <form action=/users method=post>
    Add a new user: <input type=text name="name"><br>
    <input type=submit value="add user">
    </form>
  `


app.get('/', (request, response) => {
    response.send(header)
})

app.get('/listUsers', (request, response) => {

    let userList = ""
    users.forEach(user => {
        userList += "<tr><td>" + user.id + "</td><td>" + user.name + "</td></tr>"
    })

    const tableUsers = `
    <table>
        <tr>
        <th>Id</th><th>Name</th>
        ${userList}
    </table>
    <style>
        table, th, td {
        border:1px solid black;
        }
    </style>
    `

    response.send(header + tableUsers)
})

app.get('/addUser', (request, response) => {
    response.send(header + htmlform)
})



// get all users
app.get('/users', (request, response) => {
    response.json(users)
})

// get one user
app.get('/users/:id', (request, response) => {
    //const id = request.params.id // note how you can do this in different ways!
    const { id } = request.params
    const user = users.find(user => user.id === id)
    // check if user exists or return 404
    if (user) response.json(user)
    else response.status(404).end()
})

// delete one user
app.delete('/users/:id', (request, response) => {
    //const id = request.params.id
    const { id } = request.params
    users = users.filter(user => user.id !== id)
    // Just send "204 no content" status code back
    response.status(204).end()
})

// update user data
app.put('/users/:id', (request, response) => {
    //const id = request.params.id
    const { id } = request.params
    // const name = request.query.name
    const { name } = request.query
    const user = users.find(user => user.id === id)
    if (user) {
        user.name = name
        response.status(200).end()
    } else {
        response.status(204).end()
    }
})

// create a new user
app.post('/users/', (request, response) => {
    const maxId = Math.max(...users.map(user => user.id), 0)
    const user = request.body
    user.id = (maxId + 1).toString()
    users = users.concat(user)
    response.json(user)
})
