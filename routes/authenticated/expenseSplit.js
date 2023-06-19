const router = require('express').Router();
const { verifyToken } = require('../../middlewares/verifyToken')
const expenseSplitController = require('../../controllers/ExpenseSplitController')

router.post('/', verifyToken, expenseSplitController.create)

module.exports = router