const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Define the schema for the 'users' collection
const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    moto: String,
    username: String,
    password: String
});

// Create a model for the 'users' collection
const User = mongoose.model('users', userSchema);

// Route for handling POST requests to sign up a new user
router.post('/', (req, res) => {
    const { first_name, last_name, moto, username, password, confirm_password } = req.body;

    // Check if passwords match
    if (password !== confirm_password) {
        return res.status(400).send('Parolele nu coincid');
    }

    // Create a new user document
    const newUser = new User({
        first_name,
        last_name,
        moto,
        username,
        password
    });

    // Save the new user to the database
    newUser.save()
        .then(savedUser => {
            console.log('Utilizator înregistrat cu succes:', savedUser);
            // Redirect the user to the login page or send a success message
            res.redirect('/login.html');
        })
        .catch(err => {
            console.error('Eroare la salvarea utilizatorului:', err);
            res.status(500).send('Eroare la înregistrare');
        });
});

module.exports = router; // Adaugă această linie pentru a exporta router-ul
