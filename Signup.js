const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Define the schema for the 'users' collection
const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                // Validarea adresei de email folosind o expresie regulată
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} nu este o adresă de email validă!`
        }
    },
    moto: String,
    username: String,
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                // Validarea parolei folosind expresii regulate
                return /^(?=.*[A-Z])(?=.*[!@#$%^&*()])(?=.*[0-9]).{8,}$/.test(v);
            },
            message: props => `Parola trebuie să conțină cel puțin o literă mare, un caracter special și un număr și să aibă cel puțin 8 caractere!`
        }
    }
});
userSchema.plugin(uniqueValidator);
// Middleware pentru a cripta parola înainte de a salva utilizatorul în baza de date
userSchema.pre('save', async function(next) {
    try {
        // Verificăm dacă parola a fost modificată sau este nouă
        if (!this.isModified('password')) {
            return next();
        }

        // Generăm un salt
        const salt = await bcrypt.genSalt(10);

        // Criptăm parola utilizând salt-ul generat
        const hashedPassword = await bcrypt.hash(this.password, salt);

        // Înlocuim parola cu parola criptată
        this.password = hashedPassword;

        next();
    } catch (error) {
        next(error);
    }
});

// Create a model for the 'users' collection
const User = mongoose.model('users', userSchema);

router.post('/', (req, res) => {
    const { first_name, last_name, email, moto, username, password, confirm_password } = req.body;

    // Check if passwords match
    if (password !== confirm_password) {
        return res.status(400).alert('Parolele nu coincid');
    }

    // Check if email format is valid
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).alert('Adresa de email nu este validă');
    }

    // Check if password format is valid
    if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*()])(?=.*[0-9]).{8,}$/.test(password)) {
        return res.status(400).alert('Parola trebuie să conțină cel puțin o literă mare, un caracter special și un număr și să aibă cel puțin 8 caractere');
    }

    // Create a new user document
    const newUser = new User({
        first_name,
        last_name,
        email,
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
module.exports = User;

  function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm_password');
    
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      confirmPasswordInput.type = "text";
    } else {
      passwordInput.type = "password";
      confirmPasswordInput.type = "password";
    }
  }

