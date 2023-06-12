const { Op } = require("sequelize");
const db = require('../models')
const User = db.userMaster

exports.save = async (form) => {
    return User.create({
        ...form
    })
}

exports.update = async (form) => {
    return User.update({
        ...form
    })
}

exports.findByEmail = async (email) => {
    return User.findOne({
        where: {
            email,
            status: { [Op.ne]: 99 }
        }
    })
}