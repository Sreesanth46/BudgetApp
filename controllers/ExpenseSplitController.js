const expenseSplitService = require("../services/ExpenseSplitService");
const expenseService = require("../services/ExpenseService");
const groupMemberService = require("../services/GroupMemberService");
const { createError } = require('../error/error')
const { STATUSES } = require('../constants/globals');

exports.create = async (req, res, next) => {
    const { expenseId, groupId, split } = req.body;
    const { uId } = req.user

    const expenses = await expenseService.findById(expenseId)
    if (expenses.groupId !== groupId) return next(createError(400, 'Given expense is not created for the group'))

    const groupMembers = await groupMemberService.findByGroupId(groupId)
    const memberIds = groupMembers.map(members => members.groupMemberId)
    let unknownMembers = []
    try {
        split.forEach(element => {
            if (memberIds.includes(element.groupMemberId)) unknownMembers.push(element.groupMemberId)
        });
    } catch (err) {
        return next(createError(400, `An unexpected error occured ${err}`))
    }
    if (unknownMembers.length !== 0) return next(createError(400, `Members ${unknownMembers} does not belong to the group`))
    // TODO check if the memeber exists in the group -- need to verify

    const { expense, error } = await expenseSplitService.save({ expenseId, split })
    if (error) return next(createError(400, 'Something went wrong'))

    return res.status(200).json({ message: "success", expense })
}

exports.markAsPaid = async (req, res, next) => {
    const { id } = req.params
    const { uId } = req.user

    let expenseSplit = await expenseSplitService.findById(id)
    if (!expenseSplit) return next(createError(404, 'Split not found'))
    if (expenseSplit.groupMember.user.id !== uId) return next(createError(403, 'You can only update your expense'))

    expenseSplit = await expenseSplitService.updateStatus({ id, status: STATUSES.PAID })
    return res.status(201).json({ message: 'Success', ...expenseSplit })
}