const express = require('express');
const router = express.Router();
const Discussion = require('./models/Discussion');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post('/add-discussion', async (req, res) => {
    const { title, description } = req.body;
    try {
        const newDiscussion = new Discussion({ title, description });
        await newDiscussion.save();
        res.status(201).json(newDiscussion);
    } catch (err) {
        console.error('Eroare la adăugarea discuției:', err);
        res.status(500).send('Eroare la adăugarea discuției');
    }
});

router.get('/discussions', async (req, res) => {
    try {
        const discussions = await Discussion.find().sort({ date: -1 });
        res.json(discussions);
    } catch (err) {
        console.error('Eroare la încărcarea discuțiilor:', err);
        res.status(500).send('Eroare la încărcarea discuțiilor');
    }
});

module.exports = router;
