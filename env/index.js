require('dotenv').config()

const {


    PORT,
    NODE_ENV,
    MONGODB_CONNECTION_URL,
    PASSWORD_SECRET,
    ACCESS_SECRET,
    REFRESH_SECRET,
    COOKIE_SECRET,
    REACT_APP_URL


} = process.env

module.exports.PORT = PORT || 3100;
module.exports.NODE_ENV = NODE_ENV;
module.exports.MONGODB_CONNECTION_URL = MONGODB_CONNECTION_URL;
module.exports.PASSWORD_SECRET = PASSWORD_SECRET
module.exports.ACCESS_SECRET = ACCESS_SECRET
module.exports.REFRESH_SECRET = REFRESH_SECRET
module.exports.COOKIE_SECRET = COOKIE_SECRET
module.exports.REACT_APP_URL = REACT_APP_URL