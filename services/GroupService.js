const db = require('../models')
const Groups = db.groupMaster
const { Op } = require('sequelize');

exports.save = async (form) => {
    return Groups.create({
        ...form
    })
}

exports.findById = async (id) => {
    return Groups.findOne({
        where: {
            [Op.and]: [
                { id },
                { status: { [Op.ne]: 99 } }
            ]
        }
    })
}

exports.findAllByAdminId = async (adminId) => {
    return Groups.findAll({
        where: {
            [Op.and]: [
                { status: { [Op.ne]: 99 } },
                { adminId },
            ]
        }
    })
}

exports.delete = async (id) => {
    return Groups.update({
        status: 99,
    },
        {
            where: {
                id
            }
        })
}

exports.update = async ({ name, id }) => {
    return Groups.update({
        name
    },
        {
            where: {
                id
            }
        })
}