const jwt = require('jsonwebtoken');
const { createError } = require('../error/error');
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "AccessSecretKey"

const verifyToken = async (req, res, next) => {
    let token = req.headers['authorization']
    if (!token) return next(createError(400, "You're not authenticated"))

    token = token.split(" ")[1];
    jwt.verify(token, accessTokenSecret, (err, user) => {
        if (err) return next(createError(401, "Token is invalid"))
        req.user = user;
        next()
    })
}

module.exports = { verifyToken }