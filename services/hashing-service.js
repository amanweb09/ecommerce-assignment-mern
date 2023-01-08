const crypto = require('crypto')

class HashingService {

    hash({ data, secret }) {
        return crypto
            .createHmac('sha256', secret)
            .update(data)
            .digest('hex')
    }

}

module.exports = new HashingService()