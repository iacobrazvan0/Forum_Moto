const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('./Signup').User; // Importă modelul User din Signup.js
const bcrypt = require('bcrypt');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user in the database by username
        const user = await User.findOne({ username: username });

        // Check if the user exists
        if (!user) {
            return res.status(401).send('Utilizatorul nu există');
        }

        // Compare the user's entered password with the hash stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        // Check if the passwords match
        if (!passwordMatch) {
            return res.status(401).send('Parolă incorectă');
        }

        // If passwords match, authentication is successful
        // Redirect to the forum page and send the username along with it
        res.redirect(`/Forum.html?username=${encodeURIComponent(username)}`);
    } catch (err) {
        console.error('Error searching for user:', err);
        return res.status(500).send('Eroare la login');
    }
});

module.exports = router;
