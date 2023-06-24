const db = require('../models')
const User = db.userMaster
const { Op } = db.Sequelize
const { STATUSES } = require('../constants/globals');

exports.save = async (form) => {
    return User.create({
        ...form
    })
}

exports.update = async ({ id, ...form }) => {
    return User.update({
        ...form
    }, {
        where: {
            id
        }
    })
}

exports.findById = async (id) => {
    return User.findByPk(id)
}

exports.findByEmail = async (email) => {
    return User.findOne({
        where: {
            email,
            status: { [Op.ne]: STATUSES.DELETED }
        },
    })
}

exports.findAllByEmailOrPhone = async (search) => {
    return User.findAll({
        where: {
            [Op.and]: [
                { status: { [Op.ne]: STATUSES.DELETED } },
                {
                    [Op.or]: [
                        { email: { [Op.like]: `%${search}%` } },
                        { phone: { [Op.like]: `%${search}%` } }
                    ]
                }
            ]
        },
        attributes: { exclude: ['password'] }
    })
}