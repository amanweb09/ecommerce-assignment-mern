const UserDTO = require("../../dtos/userDto");
const { PASSWORD_SECRET, ACCESS_SECRET, REFRESH_SECRET } = require("../../env")
const authService = require("../../services/auth-service")
const cartService = require("../../services/cart-service")
const hashingService = require("../../services/hashing-service")
const tokenService = require("../../services/token-service");
const signupValidator = require("../../validators/signupValidator");

class AuthController {

    async registerUser(req, res) {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please fill all the fields' })
        }

        try {
            await signupValidator(req.body)
        } catch (error) {
            console.log(error);
            return res.status(422).json({ message: "please check the info provided by you" })
        }

        try {
            const user = await authService.find({ email })

            if (user.length) {
                return res.status(400).json({ message: 'User already exists with this email' })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' })
        }

        const hashedPassword = hashingService.hash({
            data: password,
            secret: PASSWORD_SECRET
        })

        const newUser = {
            name, email, password: hashedPassword
        }

        let user;
        try {
            user = await authService.create(newUser)
            const accessToken = tokenService.generateToken({
                payload: { _id: user._id },
                secret: ACCESS_SECRET,
                expiresIn: '1h'
            })
            const refreshToken = tokenService.generateToken({
                payload: { _id: user._id },
                secret: REFRESH_SECRET,
                expiresIn: '1y'
            })

            user.refreshToken = refreshToken
            await user.save()

            const cart = {
                user: user._id,
                items: [],
                totalPrice: 0,
                totalQty: 0
            };

            try {
                await cartService.create(cart)
            } catch (error) {
                return res.status(500).json({ message: 'Filed to initialize cart' })
            }

            res.cookie('at', accessToken, {
                httpOnly: true,
                sameSite: 'none',
                secure: true
            })

            return res.status(200).json({ message: 'signup successful!', user: new UserDTO(user), cart })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    async loginUser(req, res) {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill all the fields' })
        }

        let user
        try {
            const findUser = await authService.find({ email })

            if (!findUser.length) {
                return res.status(404).json({ message: 'No user found with this email' })
            }

            user = findUser[0];

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' })
        }

        const hashedPassword = hashingService.hash({
            data: password,
            secret: PASSWORD_SECRET
        })

        if (hashedPassword !== user.password) {
            return res.status(422).json({ message: 'Invalid credentials' })
        }

        try {

            const accessToken = tokenService.generateToken({
                payload: { _id: user._id },
                secret: ACCESS_SECRET,
                expiresIn: '1d'
            })
            const refreshToken = tokenService.generateToken({
                payload: { _id: user._id },
                secret: REFRESH_SECRET,
                expiresIn: '1y'
            })

            user.refreshToken = refreshToken
        
            await user.save()
            await

                res.cookie('at', accessToken, {
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true
                })
            return res.status(200).json({ message: 'login successful!', user: new UserDTO(user) })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    async refreshAccessToken(req, res) {

        const { _id } = req.body
        const { at: accessToken } = req.cookies

        if (!accessToken) {
            return res.status(422).json({ message: "Please login to continue" })
        }

        let user;

        try {

            const findUser = await authService.find({ _id })
            user = findUser[0];

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" })
        }

        try {

            tokenService.verifyToken({
                token: user.refreshToken,
                secret: REFRESH_SECRET
            })
            const at = tokenService.generateToken({
                payload: { _id },
                secret: ACCESS_SECRET,
                expiresIn: '1d'
            })

            res.cookie('at', at)
            return res.status(200).json({ message: 'refreshed' })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" })
        }
    }

    async logout(req, res) {
        res.clearCookie('at')
        return res.status(200).json({ message: 'logged out!', user: null })
    }

    async profile(req, res) {
        try {
            const user = await authService.find({ _id: req.user._id })
            const cart = await cartService.find({ user: req.user._id })
            return res.status(200).json({
                user: new UserDTO(user[0]),
                cartCounter: cart && cart.length ? cart[0].totalQty : 0
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'something went wrong!' })
        }
    }
}

module.exports = new AuthController()
