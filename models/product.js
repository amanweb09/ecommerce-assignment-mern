const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    images: {
        thumbnail: {
            location: {
                type: String,
                required: true
            },
            src: {
                type: String,
                required: true
            }
        },
        slider: {
            type: [
                {
                    location: {
                        type: String,
                        required: true
                    },
                    src: {
                        type: String,
                        required: true
                    }
                }
            ],
        }
    },
    availability: {
        inStock: {
            type: Boolean,
            default: true
        },
        sku: {
            type: String
        }
    },
    category: {
        type: String,
        required: true
    }
})

module.exports = model('products', productSchema, 'products')