const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');
const config = require('./config');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
    req.db = config.db;
    next();
});
app.use('/api', authRoutes);
app.use('/api', dataRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
