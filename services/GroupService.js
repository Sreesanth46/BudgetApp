const db = require('../models')
const Groups = db.groupMaster

exports.save = async (form) => {
    return Groups.create({
        ...form
    })
}