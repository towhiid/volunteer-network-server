const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const port = 5000
// pass = 


const uri = "mongodb+srv://volunteer:Imam1234@cluster0.oxeo9.mongodb.net/volunteerNetwork?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("volunteerNetwork").collection("tasks");
  console.log('connected');
  client.close();
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)