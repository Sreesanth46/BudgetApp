const groupMemberService = require('../services/GroupMemberService')
const { createError } = require('../error/error');

exports.create = async (req, res, next) => {
    const { userId, groupId } = req.body
    const { uId } = req.user

    let groupMember = await groupMemberService.findByUserIdAndGroupId({ userId: uId, groupId })
    if (!groupMember) return next(createError(404, 'You are not a member of this group'))

    groupMember = await groupMemberService.findByUserIdAndGroupId({ userId, groupId })
    if (groupMember) return next(createError(400, 'Member already exists'))
    try {
        groupMember = await groupMemberService.save({ userId, groupId })
        return res.status(201).json({ message: 'Group member added successfully', groupMember })
    } catch (err) {
        return next(createError(400, 'User does not exists'))
    }
}

exports.delete = async (req, res, next) => {
    const { id } = req.params
    const { uId } = req.user
    let groupMember = await groupMemberService.findById(id)
    if (!groupMember) return next(createError(404, 'Member not found'))
    if (groupMember.group.adminId !== uId) return next(createError(403, 'You are not the admin of this group'))
    groupMember = await groupMemberService.delete(id)
    return res.status(201).json({ message: 'Member was deleted', groupMember })
}