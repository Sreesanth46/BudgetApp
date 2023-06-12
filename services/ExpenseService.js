const db = require('../models')
const Expense = db.expenseMaster
const GroupMember = db.groupMember
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
        },
        include: {
            model: GroupMember,
            as: 'group'
        }
    })
}

exports.update = async (form) => {
    return Expense.update({
        ...form
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