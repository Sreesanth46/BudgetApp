const router = require('express').Router();
const { verifyToken } = require('../../middlewares/verifyToken')
const expenseController = require('../../controllers/ExpenseController')

router.post('/', verifyToken, expenseController.create)

router.get('/group/:groupId', verifyToken, expenseController.list)

router.get('/all', verifyToken, expenseController.listAll)

router.put('/:id', verifyToken, expenseController.update)

router.delete('/:id', verifyToken, expenseController.delete)

module.exports = router