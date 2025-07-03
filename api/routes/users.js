const express = require('express');
const db = require("../db");
const router = express.Router();

// Registrar usuario (POST /api/users)
router.post('/', (req, res) => {
    const { name, email, password, phone, nickname } = req.body;
    if (!name?.trim() || !email?.trim() || !password?.trim() || !nickname?.trim()) { //Validamos que no haya strings vacios
    return res.status(400).json({ error: 'Faltan datos obligatorios o están vacíos' });
}

    db.run(
        `INSERT INTO users (name, email, password, phone, nickname) VALUES (?, ?, ?, ?, ?)`,
        [name, email, password, phone || null, nickname],
        function (err) {
            if (err) return res.status(400).json({ error: err.message });
            res.status(201).json({ id: this.lastID, name, email, phone, nickname })
        }
    )
})

module.exports = router;