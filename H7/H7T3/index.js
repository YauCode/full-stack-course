require('dotenv').config()
const express = require('express')
const app = express()
const { PORT, MONGO_URI } = process.env
app.use(express.json())


// use mongoose
const mongoose = require('mongoose')

// connect mongodb
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

// check connection - ok or error
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log("Database test connected")
})

// new schema
const userSchema = new mongoose.Schema({
    name: String
})

// new model
const User = mongoose.model('User', userSchema, 'users')





app.listen(PORT, () => {
    console.log('Example app listening on port 3000')
})

// let users =
//     [
//         { 'id': '1', 'name': 'Kirsi Kernel' },
//         { 'id': '2', 'name': 'Matti Mainio' }
//     ]

// get all users
app.get('/users', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

// get one user
app.get('/users/:id', async (request, response) => {
    const user = await User.findById(request.params.id)
    if (user) response.json(user)
    else response.status(404).end()
})

// delete one user
app.delete('/users/:id', async (request, response) => {
    const deletedUser = await User.findByIdAndRemove(request.params.id)
    if (deletedUser) response.json(deletedUser)
    else response.status(404).end()
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
app.post('/users', async (request, response) => {
    // Get name from request
    const { name } = request.body

    // Create a new user
    const user = new User({
        name: name
    })

    // Save to db and send back to caller
    const savedUser = await user.save()
    response.json(savedUser)
})