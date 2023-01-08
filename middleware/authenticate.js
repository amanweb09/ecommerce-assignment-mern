const { ACCESS_SECRET } = require("../env");
const authService = require("../services/auth-service");
const tokenService = require("../services/token-service");

module.exports = async function authenticate(req, res, next) {

    const { at } = req.cookies;

    if (!at) {
        return res.status(401).json({ message: 'Unauthorized...' })
    }

    let verifyToken;
    try {
        verifyToken = tokenService.verifyToken({
            token: at,
            secret: ACCESS_SECRET
        })

    } catch (error) {
        return res.status(401).json({
            message: 'Token expired',
            refreshed: false
        })
    }

    try {
        const user = await authService.find({ _id: verifyToken._id })

        if (!user.length) {
            return res.status(404).json({ message: 'user not found' })
        }

        req.user = user[0]
        next()

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }

}