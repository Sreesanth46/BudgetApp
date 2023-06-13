const { createError } = require("../error/error")
const userService = require('../services/UserService')

exports.update = async (req, res, next) => {
    const { uId } = req.user
    const { upi, phone, name, profilePic } = req.body
    await userService.update({ upi, phone, name, profilePic, id: uId })
    return res.status(201).json({ message: 'User updated successfully' })
}

exports.searchUsers = async (req, res, next) => {
    const { search } = req.query
    const users = await userService.findAllByEmailOrPhone(search)
    return res.status(200).json(users)
}