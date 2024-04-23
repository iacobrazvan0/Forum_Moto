const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('./Signup'); // Verifică că calea către Signup.js este corectă
const bcrypt = require('bcrypt');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Caută utilizatorul în baza de date după numele de utilizator
        const user = await User.findOne({ username: username });

        // Verifică dacă utilizatorul există
        if (!user) {
            return res.status(401).send('Utilizatorul nu există');
        }

        // Compară parola introdusă de utilizator cu hash-ul stocat în baza de date
        const passwordMatch = await bcrypt.compare(password, user.password);

        // Verifică dacă parolele coincid
        if (!passwordMatch) {
            return res.status(401).send('Parolă incorectă');
        }

        // Dacă parolele coincid, autentificarea este reușită
        res.redirect('/Forum.html');
    } catch (err) {
        console.error('Eroare la căutarea utilizatorului:', err);
        return res.status(500).send('Eroare la login');
    }
});

module.exports = router;