const db = require('../models')
const ExpenseSplit = db.expenseSplit
const Expense = db.expenseMaster
const { Op } = require('sequelize');
const { STATUSES } = require('../constants/globals');

exports.save = async ({ expenseId, split }) => {
    try {
        const expense = await ExpenseSplit.bulkCreate(split)
        await Expense.update({
            status: 2,
        },
            {
                where: { id: expenseId }
            })
        return { expense, error: null }
    } catch (error) {
        return { expense: null, error }
    }
}

exports.update = async (form) => {
    try {
        const expense = await ExpenseSplit.bulkCreate(
            form,
            { updateOnDuplicate: ["splitAmount"] }
        )
        return { expense, error: null }
    } catch (error) {
        return { expense: null, error }
    }
}

exports.findById = async (id) => {
    return ExpenseSplit.findOne({
        where: {
            [Op.and]: [
                { id },
                { status: { [Op.ne]: STATUSES.DELETED } }
            ]
        },
        include: [{
            model: GroupMember,
            as: 'groupMember',
        },
        {
            model: Expense,
            as: 'expense',
            include: {
                model: GroupMember,
                as: 'createdUser',
            },
        }]
    })
}

exports.updateStatus = async ({ id, status }) => {
    return ExpenseSplit.update({
        status
    },
        {
            [Op.and]: [
                { id },
                { status: { [Op.ne]: STATUSES.DELETED } }
            ]
        })
}