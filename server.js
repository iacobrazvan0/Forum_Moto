const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

const uri = 'mongodb+srv://razvaniacob0:9OIypiWCF9CP5Udp@cluster0.g4aw15b.mongodb.net/';
const dbName = 'FORUM_MOTO';

app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Definirea rutei pentru înregistrare (POST)
app.post('/register', async (req, res) => {
  try {
    const { first_name, last_name, moto, username, password } = req.body;

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('users');

    const result = await collection.insertOne({ first_name, last_name, moto, username, password });
    console.log('User inserted:', result.insertedId);

    res.status(200).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, message: 'Error registering user' });
  } finally {
    client.close();
  }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Pagina_de_start.html'));
  });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});
