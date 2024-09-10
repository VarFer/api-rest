const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

router.post('/acceso', async (req, res) => {
    const { username, password } = req.body;
    const user = await authService.authenticateUser(username, password);

    if (user) {
        const token = authService.generateToken({ id: user.id, username: user.username });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Credenciales inválidas' });
    }
});

module.exports = router;
