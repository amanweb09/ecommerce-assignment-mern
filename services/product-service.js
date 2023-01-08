const Products = require('./../models/product')

class ProductService {

    async find(filter) {
        return await Products
            .find(filter)
            .exec()
    }

}

module.exports = new ProductService()