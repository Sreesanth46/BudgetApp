const router = require('express').Router();
const loginController = require('../../controllers/LoginController')

router.post('/', loginController.login)

router.post('/verify', loginController.verifyAccessToken)

router.post('/refresh', loginController.refreshAccessToken)

module.exports = router