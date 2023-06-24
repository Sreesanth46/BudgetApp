const router = require('express').Router();
const { verifyToken } = require('../../middlewares/verifyToken')
const userController = require('../../controllers/UsersController')

router.get('/', verifyToken, userController.searchUsers)

router.put('/', verifyToken, userController.update)

module.exports = router