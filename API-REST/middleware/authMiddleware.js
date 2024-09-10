const jwt = require('jsonwebtoken');
const config = require('../config');

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

module.exports = authenticateJWT;
