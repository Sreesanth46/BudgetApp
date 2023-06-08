const router = require('express').Router();

router.use('/register', require('./api/registeration.js'))

module.exports = router