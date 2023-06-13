const db = require('../models')
const Groups = db.groupMaster
const GroupMembers = db.groupMembers
const { Op } = db.Sequelize

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