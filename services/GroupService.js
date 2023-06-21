const db = require('../models')
const Groups = db.groupMaster
const GroupMembers = db.groupMembers
const { Op } = db.Sequelize
const { STATUSES } = require('../constants/globals');

exports.save = async (form) => {
    const t = await db.sequelize.transaction();
    let group

    try {
        group = await Groups.create({
            ...form
        }, { transaction: t })

        await GroupMembers.create({
            groupId: group.id,
            userId: group.adminId
        }, { transaction: t })

        await t.commit();
    } catch (err) {
        await t.rollback();
        return err
    }

    return group
}

exports.findById = async (id) => {
    return Groups.findOne({
        where: {
            [Op.and]: [
                { id },
                { status: { [Op.ne]: STATUSES.DELETED } }
            ]
        }
    })
}

exports.findAllByAdminId = async (adminId) => {
    return Groups.findAll({
        where: {
            [Op.and]: [
                { status: { [Op.ne]: STATUSES.DELETED } },
                { adminId },
            ]
        }
    })
}

exports.delete = async (id) => {
    return Groups.update({
        status: STATUSES.DELETED,
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
            [Op.and]: [
                { status: { [Op.ne]: STATUSES.DELETED } },
                { adminId },
            ]
        })
}