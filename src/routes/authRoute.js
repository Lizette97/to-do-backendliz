const express = require('express');
const {login} = require('../controllers/authController');

const router = express.Router();
//Ruta para iniciar sesion
router.post('/login', login);

module.exports = router;
