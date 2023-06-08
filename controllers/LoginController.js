const userService = require('../services/UserService')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "AccessSecretKey"
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "RefreshSecretKey"
const refreshTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY

exports.login = async (req, res, next) => {
    const { email, password } = req.body
    let authUser = await userService.findByEmail(email)

    if (!authUser) return res.status(400).json({ message: "Invalid email" })

    const isEqual = await bcrypt.compare(password, authUser.password)
    if (!isEqual) return res.status(400).json({ message: "Invalid password or username" })

    try {
        const { password, ...others } = authUser.dataValues
        authUser = { uId: authUser.id, email: authUser.email }
        const accessToken = await jwt.sign({ ...authUser }, accessTokenSecret, { expiresIn: `${accessTokenExpiry}` })
        const refreshToken = await jwt.sign({ ...authUser }, refreshTokenSecret, { expiresIn: `${refreshTokenExpiry}` })
        return res.status(200).header("access-Token", accessToken).json({ ...others, accessToken, refreshToken })
    } catch (err) {
        next(err)
    }
}

exports.verifyAccessToken = async (req, res, next) => {
    const { accessToken } = req.body
    if (!accessToken) return res.status(400).json({ message: 'No access token' })
    jwt.verify(accessToken, accessTokenSecret, (err, user) => {
        if (err) return res.status(401).json({ message: "Token is invalid" })
        return res.status(200).json(user)
    })
}

exports.refreshAccessToken = async () => {
    const { refreshToken } = req.body
    jwt.verify(refreshToken, refreshTokenSecret, async (err, user) => {
        if (err) return res.status(401).json({ message: "Token is invalid" })
        const accessToken = await jwt.sign({ ...user }, accessTokenSecret, { expiresIn: `${accessTokenExpiry}` })
        return res.status(200).json({ ...user, accessToken })
    })
}