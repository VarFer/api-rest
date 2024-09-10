const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

// Middleware de autenticación
router.use(authService.authenticateJWT);

// GET /data
router.get('/data', async (req, res) => {
    const [rows] = await req.db.promise().query('SELECT * FROM records');
    res.json({ data: rows, message: '' });
});

// POST /data
router.post('/data', async (req, res) => {
    const { content } = req.body;
    const [result] = await req.db.promise().query('INSERT INTO records (content) VALUES (?)', [content]);
    res.json({ insertID: result.insertId, message: 'Registro insertado correctamente' });
});

// PATCH /data/:id
router.patch('/data/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const [result] = await req.db.promise().query('UPDATE records SET content = ? WHERE id = ?', [content, id]);
    if (result.affectedRows > 0) {
        res.json({ data: [{ id, content }], message: 'Registro actualizado correctamente' });
    } else {
        res.status(404).json({ message: 'Registro no encontrado' });
    }
});

// DELETE /data/:id
router.delete('/data/:id', async (req, res) => {
    const { id } = req.params;
    const [result] = await req.db.promise().query('DELETE FROM records WHERE id = ?', [id]);
    if (result.affectedRows > 0) {
        res.json({ data: [], message: 'Registro eliminado correctamente' });
    } else {
        res.status(404).json({ message: 'Registro no encontrado' });
    }
});

module.exports = router;
