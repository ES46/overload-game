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


app.listen(port, () => {
  console.log(`listening on ${port}`);
});
