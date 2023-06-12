const groupService = require('../services/GroupService')

exports.create = async (req, res, next) => {
    const { name } = req.body
    const { uId } = req.user
    const groups = await groupService.save({ name })
    return res.status(201).json({ message: 'Group created successfully', groups })
}

exports.update = async (req, res, next) => {
    const { name } = req.body
    const groups = await groupService.update({ name })
    return res.status(201).json({ message: 'Group updated successfully', groups })
}