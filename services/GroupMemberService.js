const db = require('../models')
const GroupMember = db.groupMembers
const Group = db.groupMaster
const { Op } = require('sequelize')

exports.save = async (form) => {
    return GroupMember.create({
        ...form
    })
}

exports.findById = async (id) => {
    return GroupMember.findOne({
        where: {
            [Op.and]: [
                { id },
                { status: { [Op.ne]: 99 } }
            ]
        },
        include: {
            model: Group,
            as: 'group'
        }
    })
}

exports.findByUserIdAndGroupId = async ({ userId, groupId }) => {
    return GroupMember.findOne({
        where: {
            [Op.and]: [
                { status: { [Op.ne]: 99 } },
                { userId },
                { groupId },
            ]
        }
    })
}

exports.delete = async (id) => {
    return GroupMember.update({
        status: 99,
        where: {
            id
        }
    })
}