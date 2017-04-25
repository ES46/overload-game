const express = require('express')
const linkQuery = require('./db/linkquery')
const bodyParser = require('body-parser')
const app = express()
const pg = require('./db/knex')
const port = process.env.PORT || 3015

app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(express.static('public'))

console.log();

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
    var userId = req.player.id

    res.redirect('/user/' + userId)
  })
})

app.get('/user/:id', (req, res) => {
  linkQuery.getUser(req.params.id)
  .then(data => {
    res.render('user', {data})
  })
})

app.listen(port, () => {
  console.log(`listening on ${port}`)
})
