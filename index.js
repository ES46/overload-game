const express = require('express')
const linkQuery = require('./db/linkQuery')
const bodyParser = require('body-parser')
const app = express()
const pg = require('./db/knex')
const port = process.env.PORT || 3010

app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('splash')
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


app.listen(port, () => {
  console.log(`listening on ${port}`);
});
