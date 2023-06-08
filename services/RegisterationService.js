const db = require('../models')
const User = db.user_master

exports.signUp = async (form) => {
    return User.create({
        ...form
    })
}