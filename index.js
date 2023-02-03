const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId, CURSOR_FLAGS } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
//middleware
app.use(cors());
app.use(express.json());






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lopokh6.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });






async function run() {
    try {
        const studentCollection = client.db('tecBlog').collection('allStudent');

        app.post('/post', async (req, res) => {
            const data = req.body;
            const result = await studentCollection.insertOne(data);
            res.send(result);
        })
        app.get('/studentData', async (req, res) => {
            const query = {};
            const data = await studentCollection.find(query).toArray();
            res.send(data);
           
        })
        


    }
    finally {

    }
}
run().catch(err => console.log(err));




app.get('/', async (req, res) => {
    res.send('Hello , Student');
})

app.listen(port, () => console.log('Hello , Student'));