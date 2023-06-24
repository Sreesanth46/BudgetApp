const router = require('express').Router();
const { verifyToken } = require('../../middlewares/verifyToken')
const expenseSplitController = require('../../controllers/ExpenseSplitController')

router.post('/', verifyToken, expenseSplitController.create)

router.put('/paid/:id', verifyToken, expenseSplitController.markAsPaid)

router.put('/verify-paid/:id', verifyToken, expenseSplitController.verifyAsPaid)

module.exports = router