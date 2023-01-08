const cartService = require("../../services/cart-service")
const productService = require("../../services/product-service")

class ProductController {

    async getAllProducts(req, res) {
        try {
            const products = await productService.find()
            return res.status(200).json({ products })
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' })

        }
    }

    async addToCart(req, res) {
        const { productId } = req.body

        if (!productId) {
            return res.status(422).json({ message: "product ID is required" })
        }

        let cart;

        try {
            const findCart = await cartService.find({ user: req.user._id })

            if (findCart.length) {
                cart = findCart[0]
            }
            else {
                cart = null;
            }

        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' })
        }

        let updatedCart;
        if (cart) {
            const productExists = cart.items.find((item) => item.product._id.toString() === productId)

            if (productExists) {

                cart.items.forEach((item) => {
                    if (item.product._id.toString() === productId) {
                        item.qty += 1
                    }
                })
                cart.totalPrice += 1;
                cart.totalQty += 1

                try {
                    const updateCart = await cart.save()
                    updatedCart = updateCart
                    return res.status(200).json({ cart: updatedCart })

                } catch (error) {
                    return res.status(500).json({ message: 'oops.. item could not be added...' })
                }
            }

            let product;
            try {
                const pr = await productService.find({ _id: productId })
                product = pr[0]
            } catch (error) {
                console.log('product not found');
                return res.status(404).json({ message: 'product not found' })
            }

            cart.items.push({
                product: productId,
                qty: 1
            })
            cart.totalQty += 1
            cart.totalPrice += product.price

            try {
                const saveCart = await cart.save()
                updatedCart = saveCart
            } catch (error) {
                return res.status(500).json({ message: 'oops.. item could not be added...' })
            }

            return res.status(200).json({ cart: updatedCart })

        }
    }

    async showCart(req, res) {
        try {
            const cart = await cartService.find({ user: req.user._id })
            return res.status(200).json({ cart: cart[0] })
        } catch (error) {
            return res.status(500).json({ cart: null })
        }
    }

}

module.exports = new ProductController()