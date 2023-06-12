const router = require('express').Router();
const { verifyToken } = require('../../middlewares/verifyToken')
const groupController = require('../../controllers/GroupController')

router.post('/', verifyToken, groupController.create)

router.put('/', verifyToken, groupController.update)

router.delete('/:id', verifyToken, groupController.delete)

module.exports = router