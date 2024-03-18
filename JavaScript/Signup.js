// Importăm modulul mongodb
const { MongoClient } = require('mongodb');

// Adresa URL a serverului MongoDB și numele bazei de date
const url = 'mongodb+srv://razvaniacob0:mkP1bspxEOQD1YJD@cluster0.g4aw15b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'FORUM_MOTO';

// Funcția pentru conectarea la baza de date MongoDB
async function connectToDB() {
  try {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(dbName);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

// Funcția pentru inserarea unui nou utilizator în baza de date
async function insertUser(firstName, lastName, motorcycle, username, password) {
  try {
    const db = await connectToDB();
    const collection = db.collection('users');
    const result = await collection.insertOne({ firstName, lastName, motorcycle, username, password });
    console.log('User inserted:', result.insertedId);
  } catch (error) {
    console.error('Error inserting user:', error);
    throw error;
  }
}

// Obținem referințe către elementele formularului
const form = document.querySelector('.signup-form');
const firstNameInput = document.getElementById('first_name');
const lastNameInput = document.getElementById('last_name');
const motoInput = document.getElementById('moto');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm_password');

// Ascultăm evenimentul de trimitere a formularului
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Oprim trimiterea formularului

  // Obținem valorile introduse în câmpurile formularului
  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const motorcycle = motoInput.value;
  const username = usernameInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  // Verificăm dacă parolele coincid
  if (password !== confirmPassword) {
    console.error('Passwords do not match');
    return;
  }

  // Apelăm funcția pentru inserarea utilizatorului în baza de date
  try {
    await insertUser(firstName, lastName, motorcycle, username, password);
    console.log('User registered successfully');
    // Aici puteți adăuga o redirecționare către o altă pagină sau afișa un mesaj de succes
  } catch (error) {
    console.error('Error registering user:', error);
    // Aici puteți afișa un mesaj de eroare sau să gestionați altfel erorile
  }
});
