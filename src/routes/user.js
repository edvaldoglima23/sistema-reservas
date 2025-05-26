const express = require('express');
const route = express.Router();

// rota GET /api/users
route.get('/', (req, res) => {
    res.send('Lista de usuarios');
})

module.exports = route;

