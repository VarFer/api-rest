const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

// Simulación de base de datos
const authenticateUser = async (username, password) => {
    const [rows] = await config.db.promise().query('SELECT * FROM users WHERE username = ?', [username]);
    const user = rows[0];
    if (user && await bcrypt.compare(password, user.password)) {
        return user;
    }
    return null;
};

const generateToken = (user) => {
    return jwt.sign(user, config.secretKey, { expiresIn: config.expiresIn });
};

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) return res.sendStatus(401);

    jwt.verify(token, config.secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

module.exports = {
    authenticateUser,
    generateToken,
    authenticateJWT
};
