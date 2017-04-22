const express = require('express')
const linkQuery = require('./db/linkQuery')
const bodyParser = require('body-parser')
const app = express()
const pg = require('./db/knex')
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`listening on ${port}`);
})
