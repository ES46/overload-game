const express = require('express')
const linkQuery = require('./db/linkQuery')
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

app.get('/username', (req, res) => {
  // linkQuery.getUser(req.params.id)
  //   .then(data => {
    res.render('user')
  })

app.post('/username/:id', (req, res) => {
  linkQuery.getUser(req.params.id)
  .then(data => {
    res.render('user')
  })
})

io.on('connection', function(socket){
  console.log('a user connected')
})

http.listen(port, () => {
  console.log(`listening on ${port}`);
});
