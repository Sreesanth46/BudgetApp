const router = require('express').Router();
const { verifyToken } = require('../../middlewares/verifyToken')
const groupController = require('../../controllers/GroupController')

router.post('/', verifyToken, groupController.create)

router.get('/', verifyToken, groupController.list)

router.put('/:id', verifyToken, groupController.update)

router.delete('/:id', verifyToken, groupController.delete)

module.exports = router