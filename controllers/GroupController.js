const groupService = require('../services/GroupService')

exports.create = async (req, res, next) => {
    const { name } = req.body
    const { uId } = req.user
    const groups = await groupService.save({ name, userId: uId })
    return res.status(201).json({ message: 'Group created successfully', groups })
}

exports.update = async (req, res, next) => {
    const { name } = req.body
    const groups = await groupService.update({ name })
    return res.status(201).json({ message: 'Group updated successfully', groups })
}

exports.delete = async (req, res, next) => {
    const { id } = req.params
    const { uId } = req.user
    let groups = await groupService.findById(id)
    if (!groups) return res.status(404).json({ message: 'Group not found' })
    if (groups.adminId !== uId) return res.status(403).json({ message: 'You are not the admin of the group' })
    groups = await groupService.delete(id)
    return res.status(201).json({ message: 'Group deleted', groups })
}