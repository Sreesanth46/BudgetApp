const jwt = require('jsonwebtoken')
const userService = require('../services/RegisterationService')

const secretKey = process.env.MAIL_TOKEN_SECRET
const expiryTime = process.env.MAIL_TOKEN_EXPIRY

exports.register = async (req, res, next) => {
    const { email } = req.body
    const token = await jwt.sign({ email }, secretKey, { expiresIn: `${expiryTime}` })

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

    const user = await userService.signUp({
        name, phone, password, email
    })

    return res.status(201).json({ message: "user registered successfully", user })
}