const router = require('express').Router();

router.use('/register', require('./api/registeration.js'))

router.use('/login', require('./api/login.js'))

module.exports = router