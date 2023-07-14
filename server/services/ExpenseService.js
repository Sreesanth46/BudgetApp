const db = require('../models')
const Expense = db.expenseMaster
const GroupMember = db.groupMembers
const Users = db.userMaster
const { Op } = db.Sequelize
const { STATUSES } = require('../constants/globals');

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
                { status: { [Op.ne]: STATUSES.DELETED } }
            ]
        }
    })
}

exports.listByCreatedBy = async (createdBy) => {
    return Expense.findAll({
        where: {
            [Op.and]: [
                { createdBy },
                { status: { [Op.ne]: STATUSES.DELETED } }
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

exports.listAllByCreatedBy = async (id) => {
    return Expense.findAll({
        where: {
            [Op.and]: [
                { status: { [Op.ne]: STATUSES.DELETED } },
                { '$createdUser.user_id$': { [Op.eq]: id } }
            ]
        },
        include: {
            model: GroupMember,
            as: 'createdUser',
            include: {
                model: Users,
                as: 'user',
                where: { id },
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
        status: STATUSES.VERIFIED,
    },
        {
            where: { id }
        })
}

exports.delete = async (id) => {
    return Expense.update({
        status: STATUSES.DELETED,
    },
        {
            where: {
                id
            }
        })
}
