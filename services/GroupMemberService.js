const db = require('../models')
const GroupMember = db.groupMember

exports.save = async (form) => {
    return GroupMember.create({
        ...form
    })
}