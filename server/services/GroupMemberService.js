const db = require('../models')
const GroupMember = db.groupMembers
const Group = db.groupMaster
const Users = db.userMaster
const { Op } = require('sequelize')
const { STATUSES } = require('../constants/globals');

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
                { status: { [Op.ne]: STATUSES.DELETED } }
            ]
        },
        include: {
            model: Group,
            as: 'group'
        }
    })
}

exports.findByGroupId = async (groupId) => {
    return GroupMember.findAll({
        where: {
            [Op.and]: [
                { groupId },
                { status: { [Op.ne]: STATUSES.DELETED } }
            ]
        },
        include: {
            model: Users,
            as: 'user',
            attributes: { exclude: ['password'] }
        }
    })
}

exports.findByUserIdAndGroupId = async ({ userId, groupId }) => {
    return GroupMember.findOne({
        where: {
            [Op.and]: [
                { status: { [Op.ne]: STATUSES.DELETED } },
                { userId },
                { groupId },
            ]
        }
    })
}

exports.delete = async (id) => {
    return GroupMember.update({
        status: STATUSES.DELETED,
        where: {
            id
        }
    })
}