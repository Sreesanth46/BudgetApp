const router = require('express').Router();
const { verifyToken } = require('../../middlewares/verifyToken')
const groupMemberController = require('../../controllers/GroupMembersController')

router.post('/', verifyToken, groupMemberController.create)

router.get('/:groupId', verifyToken, groupMemberController.list)

router.delete('/:id', verifyToken, groupMemberController.delete)

module.exports = router