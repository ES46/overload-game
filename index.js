const express = require('express')
const linkQuery = require('./db/linkquery')
const bodyParser = require('body-parser')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const pg = require('./db/knex')
const port = process.env.PORT || 3015

app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
    // linkQuery.getGif()
    // .then()=>{
    res.render('splash')
    // }
})

app.get('/login', (req, res) => {
    // linkQuery.getPage(req.params.id)
    // .then(data => {
    res.render('index')
})

app.get('/game', (req, res) => {
    // linkQuery.getPage(req.params.id)
    // .then(data => {
    res.render('game')
})

// app.get('/username', (req, res) => {
//   linkQuery.getUser(req.params.id)
//     .then(data => {
//     res.render('user')
//   })
// })

// app.post('/user', (req, res) => {
//   console.log(req.params.id);
//   req.body.id = req.params.id
//   var userId = req.params.id
//   console.log(userId)
//   linkQuery.addUser(req.body)
//   .then(()=> {
//     res.redirect('/user/' + userId)
//     console.log(req.params.id)
//   })
// })

app.post('/user', (req, res) => {
    console.log(req.body)
    linkQuery.addUser(req.body)
        .then(() => {
            res.redirect('/game')
        })
})

app.get('/user/:id', (req, res) => {
    linkQuery.getUser(req.params.id)
        .then(data => {
            res.render('user', {
                data
            })
        })
})



// Start with 1 for the first playerId
var id = 1

// Start with 0 for the score
var score = 0

// Initialize empty current commands array
var commands = []

function generateCommands(){
    var randomSet, random

    for (var i = 0; i < 3; i++) {
        // Select a random command from each player set
        randomSet = (Math.random() * 12) + (i * 12)
        random = Math.floor(randomSet)

        console.log(random)

        // Add the command to the commands array
        commands.push(random)
    }

    // Randomize the order of the commands
    commands.sort(function(a, b){return 0.5 - Math.random()})
}

function checkCommands(id){
    // If the pressed button is in the commands array
    if(commands.includes(+id)){
        // Removed the correctly pressed command from the remaining commands
        commands = commands.filter((entry) => {
            return entry !== +id
        })
    }

    // Return whether or not it was the last command to complete
    return commands
}

var duration = 60,
    timer = duration,
    minutes,
    seconds,
    loop

function moveTimer() {
    --timer

    minutes = parseInt(timer / 60, 10)
    seconds = parseInt(timer % 60, 10)

    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds

    io.emit('timer', [minutes, seconds])
}

function checkTimer(){
    if(timer === 0){
        console.log('over')
        io.emit('score', score)
        clearInterval(loop)
    }
}

function mainLoop() {
    moveTimer()
    checkTimer()
}

// Perform this callback when a player connects to the '/game' route
io.on('connection', function(socket) {
    // Send player their playerId
    io.to(socket.id).emit('id', id)

    // Start the game if the this is the 3rd player to join
    if (id === 3) {
        // Send the start message to all players
        io.emit('start', true)

        // Generate and fill the commands array with commands
        generateCommands()

        // Send an individual command to each player
        io.to(socket.id).emit('command', commands[id - 1])

        // Start the main timer loop
        loop = setInterval(mainLoop, 1000)

        // Reset the id counter
        id = 0
    }

    // Increment the id for the next player to join
    id++

    // When receiving a button message, push that button id to all players
    socket.on('button', (msg) => {
        // If the last command is fulfilled
        if(!checkCommands(msg)){
            // Add to the score total
            score += 3

            // Send the updated score the the players
            io.emit('score', score)

            // Generate new commands
            generateCommands()

            // Send the new command to the player
            io.to(socket.id).emit('command', commands[id - 1])
        }
    })
})

http.listen(port, () => {
    console.log(`listening on ${port}`)
})
