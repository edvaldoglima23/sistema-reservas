const express = require('express');
const app = express();

app.use(express.json()); // permite receber dados json

const userRouter = require('./routes/user');

app.use('/api/users', userRouter);

app.get('/', (req, res) => {
    res.send('API do Sistema de reservas funionando!');
});

module.exports = app;

