const router = require('express').Router();

router.use('/register', require('./api/registeration.js'))

router.use('/login', require('./api/login.js'))

router.use('/users', require('./authenticated/users.js'))

router.use('/group', require('./authenticated/group.js'))

router.use('/group-member', require('./authenticated/groupMember.js'))

router.use('/expense', require('./authenticated/expense.js'))

router.use('/expense-split', require('./authenticated/expenseSplit.js'))

module.exports = router