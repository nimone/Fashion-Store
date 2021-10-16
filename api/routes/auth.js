const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { celebrate } = require("celebrate")

const User = require("../models/User.model")
const { auth: authSchema } = require("../models/schema")

router.post("/register", 
	celebrate({body: authSchema.register}), 
	async (req, res) => {
	const { fullname, email, password } = req.body

	try {
		const passwordHash = await bcrypt.hash(password, 10)
		await User.create({ 
			fullname, 
			email, 
			password: passwordHash 
		})
		res.status(201).json(authResponse.userCreated)

	} catch (err) {
		console.error(err)
		res.status(500).json(authResponse.unexpectedError)
	}
})

router.post("/login", 
	celebrate({ body: authSchema.login }), 
	async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email })
	if (!user) {
		return res.status(401).json(authResponse.loginFailed)
	}

	const isValidLogin = await bcrypt.compare(password, user.password)
	if (isValidLogin) {
		const jwtToken = jwt.sign(
			{
				uid: user._id,
				isAdmin: user.isAdmin,
			}, 
			process.env.JWT_SECRET,
			{expiresIn: "3d"},
		)

		return res.json({ 
			...authResponse.loginSuccess,
			accessToken: jwtToken,
		})
	} else {
		return res.status(401).json(authResponse.loginFailed)
	}
})

const authResponse = {
	userCreated: { 
		status: "ok",
		message: "user created",
	},
	loginSuccess: {
		status: "ok",
		message: "login successful",
	},
	loginFailed: {
		status: "error",
		message: "incorrect email or password",
	},
	unexpectedError: {
		status: "error",
		message: "an unexpected error occurred",
	},
}

module.exports = router