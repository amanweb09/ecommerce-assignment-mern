const router = require('express').Router()

const authController = require('../controllers/auth')
const productController = require('../controllers/products')

const authenticate = require('../middleware/authenticate')

router.post('/signup', authController.registerUser)
router.post('/login', authController.loginUser)
router.post('/logout', authenticate, authController.logout)
router.get('/profile', authenticate, authController.profile)
router.post('/refresh', authenticate, authController.refreshAccessToken)

router.get('/products', productController.getAllProducts)

router.post('/add-to-cart', authenticate, productController.addToCart)
router.get('/cart', authenticate, productController.showCart)

module.exports = router