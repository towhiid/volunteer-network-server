const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(bodyParser.json())
app.use(cors())
const MongoClient = require('mongodb').MongoClient;
const port = 5000


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oxeo9.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const eventCollection = client.db("volunteerNetwork").collection("tasks");
  app.post('/addEvent', (req, res) => {
    const event = req.body;
    eventCollection.insertMany(event)
    .then(result => {
      
      res.send(result.insertedCount)
      console.log(result.insertedCount);
    })
  })

  app.get('/tasks', (req, res) => {
    eventCollection.find({}).limit(21)
    .toArray((err, documents) => {
      res.send(documents);
    })
  })

  app.get('/tasks', (req, res) => {
    eventCollection.find({name: req.query.name})
    .toArray((err, documents) => {
      res.send(documents)
    })
  })

  console.log('connected');
});


app.get('/', (req, res) => {
  res.send('Volunteer Network is working!')
})

app.listen(process.env.PORT || port)