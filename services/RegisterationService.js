const db = require('../models')
const User = db.userMaster

exports.signUp = async (form) => {
    return User.create({
        ...form
    })
}