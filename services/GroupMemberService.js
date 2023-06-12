const db = require('../models')
const GroupMember = db.groupMember
const Group = db.groupMaster

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
    return GroupMember.findAll({
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