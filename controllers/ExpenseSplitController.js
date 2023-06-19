const expenseSplitService = require("../services/ExpenseSplitService");
const { createError } = require('../error/error')

exports.create = async (req, res, next) => {
    const { expenseId, split } = req.body;
    const { uId } = req.user

    // TODO check if the memeber exists in the group

    const { expense, error } = await expenseSplitService.save({ expenseId, split })
    if (error) return next(createError(400, 'Something went wrong'))

    return res.status(200).json({ message: "success", expense })
}