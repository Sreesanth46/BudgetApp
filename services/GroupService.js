const db = require('../models')
const Groups = db.groupMaster
const { Op } = require('sequelize');

exports.save = async (form) => {
    return Groups.create({
        ...form
    })
}

exports.findAllByUAdminId = async (adminId) => {
    return Groups.findAll({
        where: {
            [Op.and]: [
                { status: { [Op.ne]: 99 } },
                { adminId },
            ]
        }
    })
}

exports.update = async (form) => {
    return Groups.update({
        ...form
    })
}