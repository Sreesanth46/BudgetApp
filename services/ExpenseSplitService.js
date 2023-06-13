const db = require('../models')
const ExpenseSplit = db.expenseSplit
const { Op } = require('sequelize');

exports.save = async (form) => {
    return ExpenseSplit.create({
        ...form
    })
}

exports.findById = async (id) => {
    return ExpenseSplit.findOne({
        where: {
            [Op.and]: [
                { id },
                { status: { [Op.ne]: 99 } }
            ]
        }
    })
}
