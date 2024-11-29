const express = require('express')
const dotenv = require('dotenv')
const bodyparser = require('body-parser')
const app = express()
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'todoList';
const cors =require('cors')
const port = 3000
dotenv.config()
app.use(bodyparser.json())
client.connect();
console.log('Connected successfully to server');
app.use(cors())


app.get('/', async (req, res) => {
  const db = client.db(dbName)
  const collection = db.collection("todos")
  const findResult = await collection.find({}).toArray()
  console.log("find result : ", findResult);
  res.json(findResult)
})
app.post('/', async (req, res) => {
  const todo = req.body
  const db = client.db(dbName)
  const collection = db.collection("todos")
  const findResult = await collection.insertOne(todo)
  console.log("find result : ", findResult);
  res.send({success: true, result: findResult})
})
app.delete('/', async (req, res) => {
  const todo = req.body
  const db = client.db(dbName)
  const collection = db.collection("todos")
  const findResult = await collection.deleteOne(todo)
  console.log("find result : ", findResult);
  res.send({success: true, result: findResult})
})


app.put('/todos/:id', async (req, res) => {
  const { id } = req.params; // Get the ID from the URL
  const { isCompleted } = req.body; // Get the updated data from the request body

  try {
    const db = client.db(dbName);
    const collection = db.collection("todos");

    // Update the document with the given ID
    const result = await collection.updateOne(
      { id: id }, // Find the document by its ObjectId
      { $set: { isCompleted } } // Update only the `isCompleted` field
    );
    console.log("result:  ",result)

    // Check if a document was updated
    if (result.matchedCount === 0) {
      return res.status(404).send({ success: false, message: 'Todo not found' });
    }

    console.log("Updated document:", result);
    res.send({ success: true, result });
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})