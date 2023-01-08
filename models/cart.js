const { Schema, model } = require('mongoose')

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
        unique: false
    },
    items: {
        type: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'products',
                    unique: false
                },
                qty: {
                    type: Number,
                    default: 1
                }
            }
        ],
        required: true,
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    totalQty: {
        type: Number,
        default: 0
    }
})

module.exports = model('carts', cartSchema, 'carts')