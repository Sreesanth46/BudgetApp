const db = require('../models')
const ExpenseSplit = db.expenseSplit
const Expense = db.expenseMaster
const GroupMember = db.groupMembers
const { Op } = require('sequelize');
const { STATUSES } = require('../constants/globals');

exports.save = async ({ expenseId, splits }) => {
    try {
        const expense = await ExpenseSplit.bulkCreate(splits)
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
            where: {
                [Op.and]: [
                    { id },
                    { status: { [Op.ne]: STATUSES.DELETED } }
                ]
            }
        })
}