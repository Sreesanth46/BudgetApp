const db = require('../models')
const Expense = db.expenseMaster
const GroupMember = db.groupMembers
const Users = db.userMaster
const { Op } = db.Sequelize

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

exports.listByCreatedBy = async (createdBy) => {
    return Expense.findAll({
        where: {
            [Op.and]: [
                { createdBy },
                { status: { [Op.ne]: 99 } }
            ]
        },
        include: {
            model: GroupMember,
            as: 'createdUser',
            include: {
                model: Users,
                as: 'user',
                attributes: { exclude: ['password'] }
            }
        }
    })
}

exports.update = async ({ name, amount, id }) => {
    return Expense.update({
        name,
        amount,
    },
        {
            where: {
                id
            }
        })
}

exports.markAsPaid = async (id) => {
    return Expense.update({
        status: 2,
    },
        {
            where: {
                id
            }
        })
}

exports.delete = async (id) => {
    return Expense.update({
        status: 99,
    },
        {
            where: {
                id
            }
        })
}
