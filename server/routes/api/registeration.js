const router = require('express').Router();
const registerationController = require('../../controllers/RegisterationController')

router.post('/', registerationController.register)

router.post('/signUp', registerationController.signUp)

module.exports = router