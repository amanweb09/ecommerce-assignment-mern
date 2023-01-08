const { connect, connection } = require('mongoose')
const { MONGODB_CONNECTION_URL } = require('../env')

module.exports = function connectToDb() {
    try {
        connect(MONGODB_CONNECTION_URL, {
            useUnifiedTopology: true
        })

        connection.on('open', () => console.log('connected to db'))

    } catch (error) {
        console.log(error);
    }
}