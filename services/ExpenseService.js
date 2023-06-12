const db = require('../models')
const Expense = db.expenseMaster
const { Op } = require('sequelize');

exports.save = async (form) => {
    return Expense.create({
        ...form
    })
}

exports.findById = async (id) => {
    return Expense.findOne({
        where: {
            [Op.and]: [
                { id },
                { status: { [Op.ne]: 99 } }
            ]
        }
    })
}

exports.update = async ({ name, amount, id }) => {
    return Expense.update({
        name,
        amount,
        where: {
            id
        }
    })
}

exports.markAsPaid = async (id) => {
    return Expense.update({
        status: 2,
        where: {
            id
        }
    })
}

exports.delete = async (id) => {
    return Expense.update({
        status: 99,
        where: {
            id
        }
    })
}
