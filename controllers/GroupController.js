const groupService = require('../services/GroupService')

exports.createGroup = async (req, res, next) => {
    const { name } = req.body
    const groups = await groupService.save({ name })
    return res.status(200).json({ message: 'Group created successfully', groups })
}