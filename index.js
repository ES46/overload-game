const express = require('express')
const linkQuery = require('./db/linkquery')
const bodyParser = require('body-parser')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const pg = require('./db/knex')
const port = process.env.PORT || 3015

app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: false}))
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
  res.render('index');
});

app.get('/game', (req, res) => {
  // linkQuery.getPage(req.params.id)
  // .then(data => {
  res.render('game');
});

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
  console.log(req.body);
  linkQuery.addUser(req.body)
  .then(() => {
    res.redirect('/game')
  })
})


app.get('/user/:id', (req, res) => {
  linkQuery.getUser(req.params.id)
  .then(data => {
    res.render('user', {data})
  })
})

// Start with 1 for the first playerId
var id = 1

// Perform this callback when a player connects to the '/game' route
io.on('connection', function(socket){
  // Send player their playerId
  io.to(socket.id).emit('id', id)

  // Start the game if the this is the 4th player to join
  if(id === 4){
      io.emit('start', true)
      id = 1
  }

  // Increment the id for the next player to join
  id++

  // When receiving a button message, push that button id to all players
  socket.on('button', (msg) => {
    io.emit('button', msg)
  })
})

http.listen(port, () => {
    console.log(`listening on ${port}`)
})
