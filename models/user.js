const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // cart: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'cart',
    //     unique: false
    // },
})

module.exports = model('users', userSchema, 'users')