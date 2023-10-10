require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const userService = require('../services/UserService')
const { createError } = require('../error/error')

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "AccessSecretKey"
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY || '1d'
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "RefreshSecretKey"
const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY || '7d'

exports.login = async (req, res, next) => {
    const { email, password } = req.body
    let authUser = await userService.findByEmail(email)

    if (!authUser) return next(createError(400, 'Invalid email'))

    const isEqual = await bcrypt.compare(password, authUser.password)
    if (!isEqual) return next(createError(400, 'Invalid username or password'))

    try {
        const { password, ...others } = authUser.dataValues
        authUser = { uId: authUser.id, name: authUser.name, email: authUser.email, phone: authUser.phone, upi: authUser.upi }
        const accessToken = await jwt.sign({ ...authUser }, accessTokenSecret, { expiresIn: `${accessTokenExpiry}` })
        const refreshToken = await jwt.sign({ ...authUser }, refreshTokenSecret, { expiresIn: `${refreshTokenExpiry}` })
        return res.status(200).header("access-Token", accessToken).json({ ...others, accessToken, refreshToken })
    } catch (err) {
        next(err)
    }
}

exports.verifyAccessToken = async (req, res, next) => {
    const { accessToken } = req.body
    if (!accessToken) return next(createError(400, 'No access token'))
    jwt.verify(accessToken, accessTokenSecret, (err, user) => {
        if (err) return next(createError(401, 'Token is invalid'))
        return res.status(200).json(user)
    })
}

exports.refreshAccessToken = async (req, res, next) => {
    const { refreshToken } = req.body
    jwt.verify(refreshToken, refreshTokenSecret, async (err, user) => {
        if (err) return res.status(401).json({ message: "Refresh token is invalid", errorCode: 5000 })
        const { iat, exp, ...rest } = user
        const accessToken = await jwt.sign({ ...rest }, accessTokenSecret, { expiresIn: `${accessTokenExpiry}` })
        return res.status(200).json({ ...rest, accessToken })
    })
}