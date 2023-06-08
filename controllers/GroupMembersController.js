const groupMemberService = require('../services/GroupMemberService')

exports.addMember = async (req, res, next) => {
    const { userId, groupId } = req.body
    const groupMember = await groupMemberService.save({ userId, groupId })
    return res.status(201).json({ message: 'Group member added successfully', groupMember })
}