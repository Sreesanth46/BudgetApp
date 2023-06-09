const { createError } = require('../error/error')
const groupService = require('../services/GroupService')

exports.create = async (req, res, next) => {
    const { name } = req.body
    const { uId } = req.user
    const groups = await groupService.save({ name, adminId: uId })
    return res.status(201).json({ message: 'Group created successfully', groups })
}

exports.list = async (req, res, next) => {
    const { uId } = req.user
    const groups = await groupService.findAllByAdminId(uId);
    return res.status(200).json(groups)
}

exports.update = async (req, res, next) => {
    const { name } = req.body
    const { id } = req.params
    const { uId } = req.user
    let groups = await groupService.findById(id)
    if (!groups) return next(createError(404, 'Group not found'))
    if (groups.adminId !== uId) return next(createError(404, 'You are not the admin of the group'))

    await groupService.update({ name, id })
    return res.status(201).json({ message: 'Group updated successfully' })
}

exports.delete = async (req, res, next) => {
    const { id } = req.params
    const { uId } = req.user
    let groups = await groupService.findById(id)
    if (!groups) return next(createError(404, 'Group not found'))
    if (groups.adminId !== uId) return res.status(403).json({ message: 'You are not the admin of the group' })

    await groupService.delete(id)
    return res.status(201).json({ message: 'Group deleted' })
}