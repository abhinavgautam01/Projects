const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const bodyparser = require('body-parser')
const app = express()


const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'passOP';
const cors =require('cors')
app.use(cors())

client.connect();
console.log('Connected successfully to server');

const port = 3000
app.use(bodyparser.json())

//get all password
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    
    const findResult = await collection.find({}).toArray();
    // console.log('Found documents =>', findResult);
    res.json(findResult)
})

//save a password
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    
    const findResult = await collection.insertOne(password);
    // console.log('Found documents =>', findResult);
    res.send({success: true, result: findResult})
})

//delete a password by id
app.delete('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    
    const findResult = await collection.deleteOne(password);
    // console.log('Found documents =>', findResult);
    res.send({success: true, result: findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})