const jwt = require('jsonwebtoken')

class TokenService {

    generateToken({ payload, secret, expiresIn }) {
        return jwt.sign(payload, secret, { expiresIn })
    }

    verifyToken({ token, secret }) {
        return jwt.verify(token, secret)
    }


}

module.exports = new TokenService()