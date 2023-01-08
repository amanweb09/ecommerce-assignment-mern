const Carts = require('./../models/cart')

class CartService {

    async find(filter, populate=true) {
        if(populate) {
            return await Carts
                .find(filter)
                .populate('items.product')
                .exec()
        }
        return await Carts.find(filter)
    }

    async create(cart) {
        return await Carts.create(cart)
    }

}

module.exports = new CartService()