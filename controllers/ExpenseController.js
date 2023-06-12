const { createError } = require('../error/error')
const expenseService = require('../services/ExpenseService')
const groupMemberService = require('../services/GroupMemberService')

exports.create = async (req, res, next) => {
    const { name, amount, groupId } = req.body
    const { uId } = req.user
    const groupMember = await groupMemberService.findByUserIdAndGroupId({ userId: uId, groupId })
    if (!groupMember) return next(createError(404, 'Group not found or you are not a member of this group'))

    const expense = await expenseService.create({ name, amount, groupId, createdBy: uId })
    return res.status(201).json({ message: 'Expense created successfully', expense })
}

exports.update = async (req, res, next) => {
    const { name, amount } = req.body
    const { uId } = req.user
    const { id } = req.params
    const expense = await expenseService.findById(id)
    if (!expense) return next(createError(404, 'Expense not found'))
    if (expense.createdBy !== uId) return next(createError(403, 'You didnt create the expense'))
}

exports.delete = async (req, res, next) => {
    const { id } = req.params
    const { uId } = req.user
    let expense = await expenseService.findById(id)
    if (!expense) return next(createError(404, 'Not Found'))
    if (expense.createdBy !== uId) return next(createError(404, 'You didnt create the expense'))

    expense = await expenseService.delete(id)
    return res.status(201).json({ message: 'Expense deleted', expense })
}