const jwt = require('jsonwebtoken')
const userService = require('../services/UserService')
const { createError } = require('../error/error')
const bcrypt = require('bcrypt')

const secretKey = process.env.MAIL_TOKEN_SECRET || "MailSecret"
const expiryTime = process.env.MAIL_TOKEN_EXPIRY || "1h"

exports.register = async (req, res, next) => {
    const { email } = req.body
    const token = await jwt.sign({ email }, secretKey, { expiresIn: `${expiryTime}` })
    const users = await userService.findByEmail(email)
    if (users) return next(createError(400, 'User with this email already exists'));
    // TODO eMAIL

    return res.status(200).json({ message: "Please verify your email address", token })
}

exports.signUp = async (req, res, next) => {
    try {
        const { token } = req.query;
        const verifyUser = await jwt.verify(token, secretKey);
        req.user = verifyUser
    } catch (err) {
        return next(err);
    }

    const { name, phone, password } = req.body
    const { email } = req.user
    let user
    const encryptedPassword = await bcrypt.hash(password, 10)

    try {
        user = await userService.save({
            name, phone, password: encryptedPassword, email
        })
    } catch (err) {
        return next(createError(400, 'User already exists'));
    }

    user = (({ password, ...rest }) => rest)(user.dataValues);
    return res.status(201).json({ message: "user registered successfully", user })
}