const router = require('express').Router();

router.use('/register', require('./api/registeration.js'))

router.use('/login', require('./api/login.js'))

router.use('/users', require('./authenticated/users.js'))

module.exports = router